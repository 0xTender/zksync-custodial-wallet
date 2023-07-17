import { createTRPCRouter, protectedProcedure } from "@app/server/api/trpc";
import { ethers } from "ethers";
import { z } from "zod";
import * as crypto from "crypto";
import { type PrismaClient } from "@prisma/client";
const algorithm = "aes-256-cbc";

export const recoverWallet = async (
  userId: string,
  sixDigitOtp: number,
  paymasterId: number,
  prisma: PrismaClient
) => {
  const wallet = await prisma.wallet.findFirstOrThrow({
    where: {
      userId: userId,
      paymasterId,
    },
  });
  const key_iv = [
    ...Buffer.from(wallet.decryptionKeyPartial, "hex").toJSON().data,
    ...sixDigitOtp
      .toString()
      .padStart(6, "0")
      .split("")
      .map((e) => parseInt(e)),
  ];
  const key = Buffer.from(key_iv.slice(0, 32));
  const iv = Buffer.from(key_iv.slice(32));

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decryptedPrivateKey = decipher.update(
    wallet.encryptedPrivateKey,
    "hex",
    "utf8"
  );
  decryptedPrivateKey += decipher.final("utf8");
  return decryptedPrivateKey;
};

export const walletRouter = createTRPCRouter({
  createWallet: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        apiSecret: z.string(),
        apiKey: z.string(),
        sixDigitOtp: z.coerce.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.sixDigitOtp > 999999) {
        throw new Error("Invalid OTP");
      }
      // create wallet
      const access = await ctx.prisma.access.findFirstOrThrow({
        where: {
          apiKey: input.apiKey,
          apiSecret: input.apiSecret,
        },
      });

      const ethersWallet = ethers.Wallet.createRandom();
      const privateKey = ethersWallet.privateKey;
      const partialUnencryptedPrivateKey = privateKey.slice(0, 32);
      const returnPrivateKey = privateKey.slice(32);
      const address = ethersWallet.address;
      const decryptionKeyPartial = crypto.randomBytes(42);

      const key_iv = [
        ...decryptionKeyPartial,
        ...input.sixDigitOtp
          .toString()
          .padStart(6, "0")
          .split("")
          .map((e) => parseInt(e)),
      ];
      const key = Buffer.from(key_iv.slice(0, 32));
      const iv = Buffer.from(key_iv.slice(32));

      const cipher = crypto.createCipheriv(algorithm, key, iv);

      const encryptedPrivateKey = cipher.update(privateKey, "utf8", "hex");

      await ctx.prisma.wallet.create({
        data: {
          address,
          encryptedPrivateKey: encryptedPrivateKey + cipher.final("hex"),
          decryptionKeyPartial: decryptionKeyPartial.toString("hex"),
          partialUnencryptedPrivateKey,
          userId: input.userId,
          paymasterId: access.paymasterId,
        },
      });
      return { returnPrivateKey };
    }),
});
