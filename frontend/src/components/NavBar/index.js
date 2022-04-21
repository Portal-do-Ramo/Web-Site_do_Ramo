import Image from "next/image";
import styles from "./styles.module.scss";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className={styles.all}>
      <div className={styles.title}>
        <Image src="/Ramo_logo.svg" width="auto" height="90%" />
      </div>

      <div className={styles.edit}>
        <Link href={`/marketing`}>
            <h1>Home</h1>
        </Link>

        <Link href={`/marketing/Equipes`}>
          <h1>Equipes</h1>
        </Link>

        <Link href="/marketing/PSE">
          <h1>PSE</h1>
        </Link>       
      </div>
    </div>
  );
}
