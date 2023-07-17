import { createTRPCRouter, protectedProcedure } from "@app/server/api/trpc";
import { z } from "zod";

export const paymasterRouter = createTRPCRouter({
  paymasterDetails: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .query(async ({ input, ctx }) => {
      //

      if (input.id === -1) {
        return undefined;
      }

      const paymaster = ctx.prisma.paymaster.findFirstOrThrow({
        where: {
          id: input.id,
          ownerId: ctx.session.user.id,
        },
      });
      return paymaster;
    }),
});
