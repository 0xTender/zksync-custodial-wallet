import { createTRPCRouter } from "@app/server/api/trpc";
import { exampleRouter } from "@app/server/api/routers/example";
import { dashboardRouter } from "@app/server/api/routers/dashboard";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  dashboard: dashboardRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
