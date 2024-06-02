import { v } from "convex/values";
import { internal } from "./_generated/api";
import {
  internalAction,
  internalMutation,
  mutation,
  query,
} from "./_generated/server";

export const listIdeas = query({
  args: {
    includeRandom: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    if (args.includeRandom === false) {
      return await ctx.db
        .query("ideas")
        .withIndex("byRandom", (q) => q.eq("random", false))
        .order("desc")
        .collect();
    }
    return ctx.db.query("ideas").order("desc").collect();
  },
});

export const saveIdea = mutation({
  args: {
    idea: v.string(),
    random: v.boolean(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("ideas", args);
    return id;
  },
});

export const addRandomIdea = mutation({
  args: {},
  handler: async (ctx) => {
    const id = await ctx.db.insert("ideas", {
      idea: "Generating...",
      random: true,
    });
    await ctx.scheduler.runAfter(
      0,
      internal.myFunctions.fetchRandomIdea,
      { id }
    );
  },
});

export const fetchRandomIdea = internalAction({
  args: { id: v.id("ideas") },
  handler: async (ctx, args) => {
    const response = await fetch(
      "https://appideagenerator.com/call.php"
    );
    const idea = await response.text();
    await ctx.runMutation(internal.myFunctions.updateIdea, {
      id: args.id,
      idea: idea.trim(),
    });
  },
});

export const updateIdea = internalMutation({
  args: { id: v.id("ideas"), idea: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { idea: args.idea });
  },
});
