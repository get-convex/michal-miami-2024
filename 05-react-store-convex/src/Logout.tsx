import styles from "../styles/Logout.module.css";

export function Logout() {
  return (
    <button className={styles.button} onClick={() => {}}>
      <img className={styles.img} src="https://avatar.vercel.sh/ms" />
      Log out Michal
    </button>
  );
}
