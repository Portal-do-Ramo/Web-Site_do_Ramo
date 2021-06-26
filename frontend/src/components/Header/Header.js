import styles from './styles.module.scss'
import Link from 'next/link'

export default function Header() {
  return (
    <>
      <header className={styles.headerContainer}>
        <img src="/Ramo_logo.svg" alt="logo" className={styles.logo} />

        <ul>
          <li>Ramo Estudantil Cefet-RJ</li>
          <li><p>Desenvolvendo pessoas através de projetos</p></li>
        </ul>
        <div className={styles.linkContainer}>
          <div>
            <Link href="">
              <a>Sobre</a>
            </Link>
          </div>
          <div>
            <Link href="">
              <a>Equipes</a>
            </Link>
          </div>
          <div>
            <Link href="">
              <a>Notícias</a>
            </Link>
          </div>
          <div>
            <Link href="">
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
          <div>
            <Link href="">
              <a>IEEE</a>
            </Link>
          </div>
          </div>
        <div className={styles.divRet}>
          <img src="/Rectangle.png" className={styles.ret} />
        </div>
        
      </header>
      
      <img src="/curved-border.svg" width="100%"  />
    
    </>
  )
}