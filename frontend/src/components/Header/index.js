import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { NavLink } from "../NavLink";

export default function Header({page}) {
  return (
    <>
      <header className={styles.headerContainer}>

        <div className={styles.logoContainer}>
          <img src="/Ramo_logo.svg" alt="logo" className={styles.logo}/>

          <ul>
            <li>Ramo Estudantil Cefet-RJ</li>
            <li>
              <p>Desenvolvendo pessoas através de projetos</p>
            </li>
          </ul>
        </div>
        <div className={styles.linkContainer}>
          <Link href="/">
            <a className={page === "inicio" && styles.activeLink}>Inicío</a>
          </Link>

          <Link href="/sobre" className={styles.activeLink}>
            <a className={page === "sobre" && styles.activeLink}>Sobre</a>
          </Link>

          <Link href="/equipes">
            <a className={page === "equipes" && styles.activeLink}>Equipes</a>
          </Link>

          <Link href="/PSE" className={page === "PSE" && styles.activeLink}>
            <a className={page === "PSE" && styles.activeLink}>Processo Seletivo</a>
          </Link>

          <Link href="/login">
            Marketing
          </Link>

        </div>
      </header>

      <img className={styles.curvedBorder} src="/curved-border.svg" width="100%" />
    </>
  );
}
