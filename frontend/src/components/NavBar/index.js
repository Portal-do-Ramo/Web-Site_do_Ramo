import Image from "next/image";
import styles from "./styles.module.scss";
import Link from "next/link";

export default function NavBar({ page }) {
  return (
    <div className={styles.all}>
      <div className={styles.title}>
        <Image src="/Ramo_logo.svg" width="auto" height="90%" />
      </div>

      <div className={styles.edit}>
        <Link href={`/marketing`}>
            <h1 className={page === "home" && styles.border}>Home</h1>
        </Link>

        <Link href={`/marketing/equipes`}>
          <h1 className={page === "equipes" && styles.border}>Equipes</h1>
        </Link>

        <Link href="/marketing/PSE">
          <h1 className={page === "pse" && styles.border}>PSE</h1>
        </Link>       
      </div>
    </div>
  );
}
