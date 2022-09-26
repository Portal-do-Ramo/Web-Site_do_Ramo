import styles from "./styles.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header({page, children}) {
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    document.body.style.overflowY = isOpen ? "scroll" : "hidden";
    setIsOpen(!isOpen);
  }
  
  useEffect(() => {
    document.body.style.overflowY = "scroll";
  }, [])

  return (
    <>
		<header className={page === "inicio" ? styles.homeHeader : styles.headerContainer}>
			<div className={styles.logoContainer}>
				<img src="/Ramo_logo.svg" alt="logo" className={styles.logo}/>

				<section>
					<h1>Ramo Estudantil IEEE CEFET/RJ</h1>
					<p>Desenvolvendo pessoas através de projetos técnicos e/ou sociais</p>
				</section>
			</div>

			<div className={styles.navIcon} onClick={open}>
				<svg className={isOpen ? styles.hamActivated : styles.ham} viewBox="0 0 100 100" height={50}>
					<path
					className={styles.line}
					id={isOpen ? styles.topActivated : styles.top}
					d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40" />
					<path
					className={styles.line}
					id="middle"
					d="m 30,50 h 40" />
					<path
					className={styles.line}
					id={isOpen ? styles.bottomActivated : styles.bottom}
					d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40" />
				</svg>
			</div>

			<div className={isOpen ? styles.linkContainerActivated : styles.linkContainer}>
				<Link href="/">
					<a className={page === "inicio" ? styles.activeLink : null}>Inicio</a>
				</Link>

				<Link href="/sobre">
					<a className={page === "sobre" ? styles.activeLink : null}>Sobre</a>
				</Link>

				<Link href="/equipes">
					<a className={page === "equipes" ? styles.activeLink : null}>Equipes</a>
				</Link>

				<Link href="/PSE">
					<a className={page === "PSE" ? styles.activeLink : null}>Processo Seletivo</a>
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
