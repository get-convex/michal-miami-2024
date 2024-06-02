import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import { counters } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const counterRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const counter = await ctx.db.query.counters.findFirst(
        { where: eq(counters.name, input.name) },
      );
      return counter?.value ?? 0;
    }),

  increment: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (db) => {
        const counter = await db.query.counters.findFirst({
          where: eq(counters.name, input.name),
        });
        if (counter === undefined) {
          await db
            .insert(counters)
            .values({ name: input.name, value: 1 });
          return;
        }
        await db
          .update(counters)
          .set({ value: counter.value + 1 })
          .where(eq(counters.id, counter.id));
      });
    }),
});
