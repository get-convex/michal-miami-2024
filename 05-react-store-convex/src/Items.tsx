import type { ItemData } from "./App";
import { Item } from "./Item";

export function Items({
  items,
  addToCart,
}: {
  items: ItemData[];
  addToCart: (itemId: number) => void;
}) {
  return (
    <div>
      {items
        .filter((item) => item.remaining > 0)
        .map((item) => (
          <Item item={item} key={item._id.toString()} addToCart={addToCart} />
        ))}
    </div>
  );
}
