import Image from "next/image";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useRouter } from "next/router";
import api from "../../services/api";


export default function MarketingNavBar({ page, user }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useContext(AuthContext);
  const [crews, setCrews] = useState([]);
  function open() {
    document.body.style.overflowY = isOpen ? "scroll" : "hidden";
    setIsOpen(!isOpen);
  }

  function handleSignOut() {
    signOut();
  }
  
  useEffect(() => {
    const fetchCrews = async() => {
      try {
        const {data} = await api.get("/crews")
        setCrews(data);
        
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchCrews();;
  }, [])
  

  useEffect(() => {
    document.body.style.overflowY = "scroll";
  }, [])

  let nameURL = `https://ui-avatars.com/api/?name=${user ? user.name : "Unknown"}`

  return (
    <div className={styles.all}>
      <div className={styles.title}>
        <Image src="/Ramo_logo.svg" width="90px" height="100%" onClick={() => router.push("/")}/>
        
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
          <h1 className={page === "inicio" ? styles.border : null}>Início</h1>
        </Link>

        <Link href={`/marketing/equipes`}>
          
          <h1 className={page === "equipes" ? styles.border : null}>{user && user.isAdmin ? "Equipes" : "Equipe"}</h1>
        </Link>

        {user && user.isAdmin && (
          <>
            <Link href={`/marketing/PSE`}>
              <h1 className={page === "pse" ? styles.border : null}>PSE</h1>
            </Link>
            <Link href={`/marketing/admin`}>
              <h1 className={page === "admin" ? styles.border : null}>Administradores</h1>
            </Link>
          </>
        )}

      </div>

      <div className={styles.user}>
        {user && user.name === "Site do Ramo" ? (
            <img src="/Ramo_logo.svg" className={styles.userImage} />
          ) : (
            // Ajuste para usar a equipe correspondente passada como propriedade
            crews && user && user.crewId ? (
              <img src={crews.find(crew => crew.id === user.crewId)?.imageURL} className={styles.userImage} />
            ) : (
              <img src={nameURL} className={styles.userImage} />
            )
          )}

        <section className={styles.userInfo}>
          <span>{user ? user.name : "Unknown"}</span>
          <p onClick={handleSignOut}>Sair</p>
        </section>
      </div>
    </div>
  );
}
