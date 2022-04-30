import NavBar from "../../../../../components/NavBar";
import api from "../../../../../services/api";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";

import { BiPlusMedical } from 'react-icons/bi';
import { BsFillGearFill } from 'react-icons/bs';
import MarketingMenuRoutes from "../../../../../components/MarketingMenuRoutes";

export default function premios({ crew }){ 
    const router = useRouter();

    function handleSelectOption(option) {
        router.push(`${crew.id}/${option}`);    
    }

    return (
      <div className={styles.all}>
        <NavBar page="equipes"/>
  
        <div className={styles.pageContent}>
            <div className={styles.content}>
                <MarketingMenuRoutes routesName={`Equipes/${crew.name}/Prêmios`} routes={`Equipes/${crew.id}/Premios`}/>
                <div className={styles.row}>
                    <div className={styles.text}>
                        <h1>Lista de Prêmios</h1>
                        <p>{crew.awards.length} Prêmio(s)</p>
                    </div>
                    <Link href={`/marketing/equipes/${crew.id}/premios/criar`}>
                      <span className={styles.link}>
                        <BiPlusMedical/>
                        Criar Prêmio
                      </span>
                    </Link>
                </div>
  
                <div className={styles.crewsList}>
                      {crew.awards.map((award) => { 
                        return(
                          <div className={styles.crewRow}>
                            <div className={styles.name}>
                              <img src={award.image}/>
                              <h2>{award.name}</h2>
                            </div>
                            <Link href={`/marketing/equipes/${crew.id}/premios/${award.id}`}>
                              <span className={styles.gearConfig}><BsFillGearFill/></span>
                            </Link>
                          </div>
                        )
                      })}
                </div>
            </div>
        </div>
      </div>
    )
}

export async function getServerSideProps(ctx) {
  const { crewId } = ctx.params;

  try {
    let { data } = await api.get(`/crews/${crewId}`);
    
    return {
      props: {
        crew: data
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
