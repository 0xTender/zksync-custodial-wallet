import { createTRPCRouter } from "@app/server/api/trpc";

import { dashboardRouter } from "@app/server/api/routers/dashboard";
import { exampleRouter } from "@app/server/api/routers/example";
import { paymasterRouter } from "./routers/paymaster";
import { userRouter } from "./routers/user";
import { walletRouter } from "@app/server/api/routers/wallet";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  dashboard: dashboardRouter,
  user: userRouter,
  paymaster: paymasterRouter,
  wallet: walletRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
