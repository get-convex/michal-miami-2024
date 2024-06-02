import { api } from "../convex/_generated/api";
import { useQuery } from "convex/react";
import { CartItem as CartItem } from "./CartItem";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "../styles/Cart.module.css";

export function Cart() {
  const { user } = useAuth0();
  const cartItems = useQuery(api.cart.get);

  return (
    <div>
      <div className={styles.cartHead}>
        <img className={styles.img} src={user!.picture} />
        <h2 className={styles.h2}>{user!.given_name ?? "Someone"}'s cart</h2>
      </div>
      <div>
        {(cartItems?.length ?? 0) > 0 ? (
          cartItems!.map(({ cartItem, item }) => (
            <CartItem
              cartItem={cartItem}
              item={item}
              key={cartItem._id.toString()}
            />
          ))
        ) : (
          <div className={styles.empty}>Add an item to see it here</div>
        )}
      </div>
    </div>
  );
}
