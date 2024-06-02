import styles from "../styles/Home.module.css";
import { Items } from "./Items";
import { Cart } from "./Cart";
import { Logout } from "./Logout";
import { useState } from "react";

const ITEMS = [
  {
    _id: 3,
    description: "A bag of everything",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/600px-Good_Food_Display_-_NCI_Visuals_Online.jpg",
    name: "Assorted JS Foods",
    price: 99.99,
    remaining: 11,
  },
  {
    _id: 2,
    description: "Baked this morning",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/BULLAR_CRYSTAL.jpg/440px-BULLAR_CRYSTAL.jpg",
    name: "CSS cinnamon rolls",
    price: 15.45,
    remaining: 3,
  },
  {
    _id: 1,
    description: "Something yummy",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Oursons_g%C3%A9latine_march%C3%A9_Rouffignac.jpg/500px-Oursons_g%C3%A9latine_march%C3%A9_Rouffignac.jpg",
    name: "React gummies",
    price: 39.99,
    remaining: 4,
  },
];

export type ItemData = (typeof ITEMS)[0];

export type CartItemData = {
  count: number;
  _id: number;
};

export default function Home() {
  const [items, setItems] = useState(ITEMS);
  const [cartItems, setCartItems] = useState<CartItemData[]>([]);
  return (
    <div className={styles.container}>
      <Logout />
      <h1 className={styles.heading}>
        Store with a Shopping Cart
        <br />
        React
      </h1>

      <main className={styles.main}>
        <div className={styles.parent}>
          <div className={styles.left}>
            <Items
              items={items}
              addToCart={(itemId) => {
                const cartItem = cartItems.find(
                  (cartItem) => cartItem._id === itemId
                );
                if (cartItem) {
                  setCartItems(
                    cartItems.map((cartItem) =>
                      cartItem._id === itemId
                        ? { ...cartItem, count: cartItem.count + 1 }
                        : cartItem
                    )
                  );
                } else {
                  setCartItems([...cartItems, { _id: itemId, count: 1 }]);
                }
                setItems(
                  items.map((item) =>
                    item._id === itemId
                      ? { ...item, remaining: item.remaining - 1 }
                      : item
                  )
                );
              }}
            />
          </div>
          <div className={styles.right}>
            <Cart
              cartItems={cartItems}
              items={items}
              removeFromCart={(itemId) => {
                setItems((items) =>
                  items.map((item) => {
                    if (item._id === itemId) {
                      return {
                        ...item,
                        remaining: item.remaining + 1,
                      };
                    }
                    return item;
                  })
                );
                setCartItems((cartItems) =>
                  cartItems.map((cartItem) => {
                    if (cartItem._id === cartItem._id) {
                      return {
                        ...cartItem,
                        count: cartItem.count - 1,
                      };
                    }
                    return cartItem;
                  })
                );
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
