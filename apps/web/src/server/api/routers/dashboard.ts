import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@app/server/api/trpc";

import { ethers } from "ethers";
import { env } from "@app/env.mjs";
import { RegistryABI } from "@root/core";

export const dashboardRouter = createTRPCRouter({
  createPaymaster: publicProcedure
    .input(z.object({ tx: z.string() }))
    .query(async ({ input, ctx }) => {
      // get the paymaster from the tx
      const provider = new ethers.providers.JsonRpcProvider(env.RPC_URL);

      const iface = new ethers.utils.Interface(RegistryABI);

      const topic = iface.getEventTopic("CreatePaymaster");

      console.log(topic);
      const r = (await provider.getTransactionReceipt(input.tx)).logs.filter(
        (e) => e.topics?.[0] === topic
      )[0];
      const chainId = (await provider.getNetwork()).chainId;

      const [from, paymaster] = ethers.utils.defaultAbiCoder.decode(
        ["address", "address", "uint256"],
        r?.data ?? ""
      ) as [string, string, ethers.BigNumber];

      const owner = await ctx.prisma.user.upsert({
        where: { address: from },
        create: { address: from },
        update: { address: from },
      });

      await ctx.prisma.paymaster.upsert({
        where: { address: paymaster },
        create: { address: paymaster, chainId: chainId, ownerId: owner.id },
        update: {},
      });

      return { paymaster };
    }),
});
