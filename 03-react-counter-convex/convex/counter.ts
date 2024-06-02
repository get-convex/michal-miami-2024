import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const counter = await ctx.db
      .query("counters")
      .withIndex("byName", (q) => q.eq("name", args.name))
      .unique();
    return counter?.value ?? 0;
  },
});

export const increment = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const counter = await ctx.db
      .query("counters")
      .withIndex("byName", (q) => q.eq("name", args.name))
      .unique();
    if (counter === null) {
      await ctx.db.insert("counters", {
        name: args.name,
        value: 1,
      });
      return;
    }
    await ctx.db.patch(counter._id, {
      value: counter.value + 1,
    });
  },
});
