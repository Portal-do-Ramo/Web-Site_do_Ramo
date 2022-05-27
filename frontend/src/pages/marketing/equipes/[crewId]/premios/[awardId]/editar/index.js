import MarketingNavBar from "../../../../../../../components/MarketingNavBar";
import api from "../../../../../../../services/api";
import MarketingMenuRoutes from "../../../../../../../components/MarketingMenuRoutes";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";

export default function premioEditar({ crew, award }){ 
  const router = useRouter();

  const [year, setYear] = useState("2022");
  const [placing, setPlacing] = useState("1");


  const years = [
    '2008', '2009', '2010',
    '2011', '2012', '2013',
    '2014', '2015', '2016',
    '2017', '2018', '2019',
    '2020', '2021', '2022',
  ];

  const placings = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9'
  ];

  return (
    <div className={styles.all}>
      <MarketingNavBar page={"equipes"}/>

        <div className={styles.pageContent}>
            <div className={styles.content}>
                <MarketingMenuRoutes 
                  routesName={`Equipes/${crew.name}/Prêmios/${award.name}/Editar`} 
                  routes={`equipes/${crew.id}/premios/${award.id}/editar`}
                />

                <h1>Editar Prêmio</h1>

                <div className={styles.description}>

                    <div className={styles.nameHolder}>
                        <span>Nome do prêmio</span>
                        <input type="text" placeholder='Digite o nome do prêmio'></input>
                    </div>

                    <div className={styles.other}>
                      <div className={styles.selects}>
                        <span>Ano da premiação</span>
                        <select required value={year} onChange={(event) => setYear(event.target.value)}>
                          
                          {years.map((year, idx) => {
                            return (
                              <option key={idx} value={year}>{year}</option>
                            )
                          })}
                          </select>
                      </div>

                      <div className={styles.selects}>
                        <span>Colocação</span>
                        <select required value={placing} onChange={(event) => setPlacing(event.target.value)}>
                          
                          {placings.map((placing, idx) => {
                            return (
                              <option key={idx} value={placing}>{placing}º</option>
                            )
                          })}
                        </select>
                      </div>
                    </div>
                </div>

                <div className={styles.buttonRow}>
                    <button className={styles.cancel}>Cancelar</button>
                    <button className={styles.edit}>Editar</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { crewId, awardId } = ctx.params;

  try {
    let { data } = await api.get(`/crews/${crewId}`);

    let crew = data;
    let award = data.awards.find(award => award.id === Number(awardId));

    if (!award) {
        throw new Error("id do projeto não existe");
    }
    
    return {
      props: {
        crew,
        award
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
