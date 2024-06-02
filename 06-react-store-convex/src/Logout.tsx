import { useAuth0 } from "@auth0/auth0-react";
import styles from "../styles/Logout.module.css";

export function Logout() {
  const { logout, user } = useAuth0();

  return (
    <button
      className={styles.button}
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      <img className={styles.img} src={user!.picture} />
      Log out {user!.given_name}
    </button>
  );
}
