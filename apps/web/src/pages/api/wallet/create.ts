import { prisma } from "@app/server/db";
import { ethers } from "ethers";
import { type NextRequest, type NextResponse } from "next/server";
import { z } from "zod";
import * as crypto from "crypto";

const algorithm = "aes-256-cbc";

export default async function handler(req: NextRequest, res: NextResponse) {
  const schema = z.object({
    userId: z.string(),
    apiSecret: z.string(),
    apiKey: z.string(),
    sixDigitOtp: z.coerce.number(),
  });
  const input = schema.parse(req.body as unknown);

  const ctx = { prisma };
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return res.json({ returnPrivateKey });
}
