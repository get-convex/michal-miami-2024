import styles from "../styles/Home.module.css";
import { Items } from "./Items";
import { Cart } from "./Cart";
import { Logout } from "./Logout";

export default function Home() {
  return (
    <div className={styles.container}>
      <Logout />

      <main className={styles.main}>
        <div className={styles.parent}>
          <div className={styles.left}>
            <Items />
          </div>
          <div className={styles.right}>
            <Cart />
          </div>
        </div>
      </main>
    </div>
  );
}
