import styles from "../styles/Item.module.css";
import { ItemData } from "./App";

export function Item({
  item,
  addToCart,
}: {
  item: ItemData;
  addToCart: (itemId: number) => void;
}) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className={styles.item}>
      <img className={styles.itemImage} src={item.image} />
      <div className={styles.itemText}>
        <div className={styles.itemName}>{item.name}</div>
        <div className={styles.itemDesc}>{item.description}</div>
        <div className={styles.itemPrice}>{formatter.format(item.price)}</div>
        <button
          className={styles.itemButton}
          onClick={() => addToCart(item._id)}
        >
          Add to Cart
        </button>
        <span>({item.remaining} remaining)</span>
      </div>
    </div>
  );
}
