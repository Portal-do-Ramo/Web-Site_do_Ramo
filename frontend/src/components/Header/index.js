import styles from "./styles.module.scss";
import Link from "next/link";
import { NavLink } from "../NavLink";

export default function Header() {
  return (
    <>
      <header className={styles.headerContainer}>
        <Link href="/">
          <img src="/Ramo_logo.svg" alt="logo" className={styles.logo}/>
        </Link>

        <ul>
          <li>Ramo Estudantil Cefet-RJ</li>
          <li>
            <p>Desenvolvendo pessoas através de projetos</p>
          </li>
        </ul>
        <div className={styles.linkContainer}>
          <div>
            <Link href="/">
              <a>Home</a>
            </Link>
          </div>
          <div>
            <Link href="/sobre">
              <a>Sobre</a>
            </Link>
          </div>
          <div>
            <Link href="/equipes">
              <a>Equipes</a>
            </Link>
          </div>
          <div>
            <Link href="/noticias">
              <a>Notícias</a>
            </Link>
          </div>
          <div>
            <Link href="/PSE">
              <a>Processo seletivo</a>
            </Link>
          </div>
          <div>
            <Link href="">
              <a>Parcerias</a>
            </Link>
          </div>
          <div>
            <Link href="">
              <a>Contato</a>
            </Link>
          </div>
        </div>
        <div className={styles.divRet}>
          <img src="/Rectangle.png" className={styles.ret} />
        </div>
      </header>

      <img className={styles.curvedBorder} src="/curved-border.svg" width="100%" />
    </>
  );
}
