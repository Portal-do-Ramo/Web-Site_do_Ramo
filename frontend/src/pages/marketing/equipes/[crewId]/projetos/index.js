import NavBar from "../../../../../components/NavBar";
import api from "../../../../../services/api";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";

import { BiPlusMedical } from 'react-icons/bi';
import { BsFillGearFill } from 'react-icons/bs';

export default function projetos({ crew }){ 
    const router = useRouter();

    function handleSelectOption(option) {
        router.push(`${crew.id}/${option}`);    
    }

    return (
      <div className={styles.all}>
        <NavBar page="equipes"/>
  
        <div className={styles.pageContent}>
            <div className={styles.content}>
                <div className={styles.row}>
                    <div className={styles.text}>
                        <h1>Lista de Projetos</h1>
                        <p>{crew.projects.length} Projetos</p>
                    </div>
                    <Link href={`/marketing/equipes/${crew.id}/projetos/criar`}>
                      <span className={styles.link}>
                        <BiPlusMedical/>
                        Criar Projeto
                      </span>
                    </Link>
                </div>
  
                <div className={styles.crewsList}>
                      {crew.projects.map((project) => { 
                        return(
                          <div className={styles.crewRow}>
                            <div className={styles.name}>
                              <img src={crew.image}/>
                              <h2>{crew.name}</h2>
                            </div>
                            <Link href={`/marketing/equipes/${crew.id}/projetos/${project.id}`}>
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
