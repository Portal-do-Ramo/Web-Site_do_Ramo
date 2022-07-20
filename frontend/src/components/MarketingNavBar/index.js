import Image from "next/image";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MarketingNavBar({ page, user }) {
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    document.body.style.overflowY = isOpen ? "scroll" : "hidden";
    setIsOpen(!isOpen);
  }
  
  useEffect(() => {
    document.body.style.overflowY = "scroll";
  }, [])

  let nameURL = `https://ui-avatars.com/api/?name=${user.name}`
  
  return (
    <div className={styles.all}>
      <div className={styles.title}>
        <Image src="/Ramo_logo.svg" width="90px" height="100%" />
        
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
      </div>

      <div className={isOpen ? styles.routesActivated : styles.routes}>
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
        <img src={nameURL} className={styles.userImage}/>

        <section className={styles.userInfo}>
          <span>{user.name}</span>
          <p>sair</p>
        </section>
      </div>
    </div>
  );
}
