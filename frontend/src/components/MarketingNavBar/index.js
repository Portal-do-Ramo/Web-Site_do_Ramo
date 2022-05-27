import Image from "next/image";
import styles from "./styles.module.scss";
import Link from "next/link";

export default function MarketingNavBar({ page }) {
  return (
    <div className={styles.all}>
      <div className={styles.title}>
        <Image src="/Ramo_logo.svg" width="90px" height="100%" />
      </div>

      <div className={styles.routes}>
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

      <div className={styles.user}>
        <section className={styles.userImage}>

        </section>

        <section className={styles.userInfo}>
          <span>Nome Sobrenome</span>
          <p>marketing</p>
        </section>
      </div>
    </div>
  );
}
