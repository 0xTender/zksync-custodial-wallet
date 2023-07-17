import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@app/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { recoverMessageAddress } from "viem";
import { z } from "zod";

import * as jwt from "jsonwebtoken";
import { env } from "@app/env.mjs";

export const userRouter = createTRPCRouter({
  registerUser: publicProcedure
    .input(
      z.object({
        address: z.string(),
        signature: z.string(),
        message: z.object({ username: z.string() }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // if user exists return user
      const userExists = await ctx.prisma.user.findFirst({
        where: {
          address: input.address,
        },
      });
      if (userExists) {
        return userExists;
      }

      const recoveredAddress = await recoverMessageAddress({
        message: JSON.stringify(input.message),
        signature: input.signature as `0x${string}`,
      });

      if (recoveredAddress !== input.address) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          cause: "Signature does not match address.",
        });
      }

      // create user
      const user = await ctx.prisma.user.create({
        data: {
          address: input.address,
          username: input.message.username,
        },
      });

      return user;
    }),
  login: publicProcedure
    .input(
      z.object({
        address: z.string(),
        signature: z.string(),
        message: z.object({ address: z.string(), timestamp: z.number() }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirstOrThrow({
        where: {
          address: input.address,
        },
      });

      const recoveredAddress = await recoverMessageAddress({
        message: JSON.stringify(input.message),
        signature: input.signature as `0x${string}`,
      });

      if (
        recoveredAddress !== input.address ||
        input.message.address !== recoveredAddress ||
        input.message.timestamp + 30_0000 < Date.now()
      ) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          cause: "Signature does not match address.",
        });
      }

      return {
        token: jwt.sign(
          JSON.stringify({
            id: user.id,
          }),
          env.SECRET
        ),
      };
    }),
  details: protectedProcedure
    .input(
      z.object({
        address: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.user.findFirst({
        where: {
          address: input.address,
        },
      });
    }),
});
