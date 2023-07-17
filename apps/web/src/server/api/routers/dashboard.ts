import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@app/server/api/trpc";

import { ethers } from "ethers";
import { env } from "@app/env.mjs";
import { RegistryABI, addresses } from "@root/core";

export const dashboardRouter = createTRPCRouter({
  setAllowedContracts: publicProcedure
    .input(z.object({ tx: z.string() }))
    .mutation(() => {
      //
      return {};
    }),
  getPaymasters: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.paymaster.findMany({
      where: {
        ownerId: ctx.session.user.id,
      },
    });
  }),
  createPaymaster: protectedProcedure
    .input(z.object({ tx: z.string(), paymasterName: z.string().optional() }))
    .mutation(async ({ input, ctx }) => {
      const provider = new ethers.providers.JsonRpcProvider(env.RPC_URL);

      const iface = new ethers.utils.Interface(RegistryABI);

      const topic = iface.getEventTopic("CreatePaymaster");

      const r = (await provider.getTransactionReceipt(input.tx)).logs.filter(
        (e) => e.topics?.[0] === topic
      )[0];
      const chainId = (await provider.getNetwork()).chainId;

      const parsedChainId = z.enum(["280", "270"]).parse(chainId.toString());

      const Registry = addresses[parsedChainId].Registry;

      const [from, paymaster] = ethers.utils.defaultAbiCoder.decode(
        ["address", "address", "uint256"],
        r?.data ?? ""
      ) as [string, string, ethers.BigNumber];

      if (Registry === undefined) {
        throw new Error("Registry not found.");
      }
      if (Registry !== r?.address) {
        throw new Error("Transaction not of correct registry.");
      }

      const owner = await ctx.prisma.user.upsert({
        where: { address: from },
        create: { address: from },
        update: { address: from },
      });

      await ctx.prisma.paymaster.upsert({
        where: { address: paymaster },
        create: {
          name: input.paymasterName ?? `${paymaster}`,
          address: paymaster,
          chainId: chainId,
          ownerId: owner.id,
        },
        update: {},
      });

      return { paymaster };
    }),
});
