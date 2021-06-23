import styles from './styles.module.scss'
import Link from 'next/link'

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <img src="/Ramo_Branco 2.png" alt="logo" className={styles.logo} />

      <ul>
        <li>Ramo Estudantil Cefet-RJ</li>
        <li><p>Desenvolvendo pessoas através de projetos</p></li>
      </ul>
      <div className={styles.link}>
        <Link href="">
          <a>Sobre</a>
        </Link>
        <Link href="">
          <a>Equipes</a>
        </Link>
        <Link href="">
          <a>Notícias</a>
        </Link>
        <Link href="">
          <a>Processo Seletivo</a>
        </Link>
        <Link href="">
          <a>Parcerias</a>
        </Link>
        <Link href="">
          <a>Contato</a>
        </Link>
        <Link href="">
          <a>IEEE</a>
        </Link>
      </div>
      <div className={styles.divRet}>
        <img src="/Rectangle.png" className={styles.ret} />
      </div>
    </header>
  )
}