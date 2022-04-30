import NavBar from "../../../components/NavBar"
import MarketingMenuRoutes from "../../../components/MarketingMenuRoutes";
import Link from "next/link";
import styles from "../../../styles/marketingEquipes.module.scss"
import api from '../../../services/api'

import { BiPlusMedical } from 'react-icons/bi';
import { BsFillGearFill } from 'react-icons/bs';

export default function equipes({ crews }){
  return (
    <div className={styles.all}>
      <NavBar page="equipes"/>

      <div className={styles.pageContent}>
          <div className={styles.content}>
              <MarketingMenuRoutes routesName={`Equipes`} routes={`Equipes`}/>
              <div className={styles.row}>
                  <div className={styles.text}>
                      <h1>Lista de Equipes</h1>
                      <p>{crews.length} Equipes</p>
                  </div>
                  <Link href={"/marketing/equipes/criar"}>
                    <span className={styles.link}>
                      <BiPlusMedical/>
                      Criar Equipe
                    </span>
                  </Link>
              </div>

              <div className={styles.crewsList}>
                    {crews.map((crew) => { 
                      return(
                        <div className={styles.crewRow} key={crew.id}>
                          <div className={styles.name}>
                            <img src={crew.image}/>
                            <h2>{crew.name}</h2>
                          </div>
                          <Link href={`/marketing/equipes/${crew.id}`}>
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

export const getServerSideProps = async () => {
  let {data : crews} = await api.get("/crews");

  return {
    props: {
      crews
    }
  }
}