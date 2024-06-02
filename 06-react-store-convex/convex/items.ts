import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async ({ db }) => {
    console.log("fetching items");

    const items = await db
      .query("items")
      .withIndex("remaining", (q) => q.gt("remaining", 0))
      .collect();
    return items.sort((a, b) => a.name.localeCompare(b.name));
  },
});
