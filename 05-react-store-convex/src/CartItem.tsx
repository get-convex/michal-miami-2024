import styles from "../styles/CartItem.module.css";
import { CartItemData, ItemData } from "./App";

export function CartItem({
  cartItem,
  item,
  removeFromCart,
}: {
  cartItem: CartItemData;
  item: ItemData;
  removeFromCart: () => void;
}) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className={styles.cartItem}>
      <img className={styles.cartItemImage} src={item.image} />
      <div className={styles.cartItemText}>
        <div className={styles.cartItemName}>{item.name}</div>
        <div>{cartItem.count} in cart</div>
        <div>
          Total:{" "}
          <span className={styles.cartItemPrice}>
            {formatter.format(cartItem.count * item.price)}
          </span>
        </div>
        <button
          className={styles.cartItemButton}
          onClick={() => removeFromCart()}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
