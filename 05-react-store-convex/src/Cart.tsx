import styles from "../styles/Cart.module.css";
import { CartItemData, ItemData } from "./App";
import { CartItem } from "./CartItem";

export function Cart({
  cartItems,
  items,
  removeFromCart,
}: {
  cartItems: CartItemData[];
  items: ItemData[];
  removeFromCart: (itemId: number) => void;
}) {
  const filtered = cartItems?.filter((cartItem) => cartItem.count > 0);
  return (
    <div>
      <div className={styles.cartHead}>
        <img className={styles.img} src="https://avatar.vercel.sh/ms" />
        <h2 className={styles.h2}>Michal's cart</h2>
      </div>
      <div>
        {(filtered?.length ?? 0) > 0 ? (
          filtered.map((cartItem) => (
            <CartItem
              cartItem={cartItem}
              item={items.find((item) => item._id === cartItem._id)!}
              key={cartItem._id.toString()}
              removeFromCart={() => removeFromCart(cartItem._id)}
            />
          ))
        ) : (
          <div className={styles.empty}>Add an item to see it here</div>
        )}
      </div>
    </div>
  );
}
