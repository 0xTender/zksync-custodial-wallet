import { createTRPCRouter, protectedProcedure } from "@app/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { makeId } from "@app/utils/random";

export const paymasterRouter = createTRPCRouter({
  addContract: protectedProcedure
    .input(
      z.object({
        paymasterId: z.coerce.number(),
        contract: z.object({
          address: z.string(),
          name: z.string(),
          abiString: z.string(),
          selectors: z.array(
            z.object({ name: z.string(), selector: z.string() })
          ),
        }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const paymaster = await ctx.prisma.paymaster.findFirstOrThrow({
        where: {
          id: input.paymasterId,
          ownerId: ctx.session.user.id,
        },
      });

      // create contract
      let contract = await ctx.prisma.contract.findFirst({
        where: {
          address: input.contract.address,
        },
      });

      if (contract) {
        throw new TRPCError({
          code: "CONFLICT",
          cause: "Contract already exists.",
        });
      } else {
        contract = await ctx.prisma.contract.create({
          data: {
            abiString: input.contract.abiString,
            name: input.contract.name,
            address: input.contract.address,
            paymasterId: paymaster.id,
          },
        });
      }

      // add selector if not exists
      for (let index = 0; index < input.contract.selectors.length; index++) {
        let selector = await ctx.prisma.allowedFunction.findFirst({
          where: {
            contractsId: contract.id,
            selector: input.contract.selectors[index]?.selector,
            name: input.contract.selectors[index]?.name,
          },
        });
        if (!selector) {
          selector = await ctx.prisma.allowedFunction.create({
            data: {
              contractsId: contract.id,
              selector: input.contract.selectors[index]?.selector ?? "",
              name: input.contract.selectors[index]?.name ?? "",
            },
          });
        }
      }

      return { contract };
    }),
  paymasterDetails: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .query(async ({ input, ctx }) => {
      //

      if (input.id === -1) {
        return undefined;
      }

      const paymaster = await ctx.prisma.paymaster.findFirstOrThrow({
        where: {
          id: input.id,
          ownerId: ctx.session.user.id,
        },
      });

      const contract = await ctx.prisma.contract.findMany({
        where: {
          paymasterId: paymaster.id,
        },
        select: {
          AllowedFunctions: true,
          name: true,
          id: true,
          address: true,
        },
      });
      const access = await ctx.prisma.access.findMany({
        where: {
          paymasterId: paymaster.id,
        },
      });

      return { paymaster, contract, access };
    }),
  createAccess: protectedProcedure
    .input(
      z.object({
        paymasterId: z.coerce.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      //
      const paymaster = await ctx.prisma.paymaster.findFirstOrThrow({
        where: {
          id: input.paymasterId,
          ownerId: ctx.session.user.id,
        },
      });

      const access = await ctx.prisma.access.create({
        data: {
          apiKey: makeId(32),
          paymasterId: paymaster.id,
          apiSecret: makeId(32),
        },
      });

      return { access };
    }),
});
