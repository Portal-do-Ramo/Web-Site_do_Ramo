import styles from "./styles.module.scss";
import Link from "next/link";

export default function Header({page, children}) {
  return (
    <>
      <header className={page === "inicio" ? styles.homeHeader : styles.headerContainer}>
        <div className={styles.logoContainer}>
          <img src="/Ramo_logo.svg" alt="logo" className={styles.logo}/>

          <section>
            <h1>Ramo Estudantil IEEE CEFET-RJ</h1>
            <p>Desenvolvendo pessoas através de projetos</p>
          </section>
        </div>

        <div className={styles.linkContainer}>
          <Link href="/">
            <p href="/" className={page === "inicio" && styles.activeLink}>Inicio</p>
          </Link>

          <Link href="/sobre" className={styles.activeLink}>
            <p className={page === "sobre" && styles.activeLink}>Sobre</p>
          </Link>

          <Link href="/equipes">
            <p className={page === "equipes" && styles.activeLink}>Equipes</p>
          </Link>

          <Link href="/PSE" className={page === "PSE" && styles.activeLink}>
            <p className={page === "PSE" && styles.activeLink}>Processo Seletivo</p>
          </Link>

          <Link href="/login">
            Marketing
          </Link>
        </div>

        {children}

      </header>

      {page === "inicio" && 
        <img className={styles.curvedBorder} src="/curved-border.svg" width="100%" />
      }
    </>
  );
}
