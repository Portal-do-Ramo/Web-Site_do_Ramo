import NavBar from "../../../../../../components/NavBar";
import api from "../../../../../../services/api";
import MarketingMenuRoutes from "../../../../../../components/MarketingMenuRoutes";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";

export default function premioCriar({ crew }){ 
    const router = useRouter();

    const setYear = useState();
    const setPosition = useState();


    const year = [
      '2008', '2009', '2010',
      '2011', '2012', '2013',
      '2014', '2015', '2016',
      '2017', '2018', '2019',
      '2020', '2021', '2022',
    ];

    const position = [
      '9', '8', '7',
      '6', '5', '4',
      '3', '2', '1',
    ];

    function handleSelectOption(option) {
      router.push(`${crew.id}/${option}`);    
    }

    return (
      <div className={styles.all}>
        <NavBar page={"equipes"}/>
  
          <div className={styles.pageContent}>
              <MarketingMenuRoutes 
                routesName={`Equipes/${crew.name}/Prêmios/Criar`} 
                routes={`equipes/${crew.id}/premios/criar`}
              />

              <div className={styles.content}>
                  <h1>Criar Prêmio</h1>
  
                  <div className={styles.description}>
  
                      <div className={styles.nameHolder}>
                          <span>Nome do prêmio</span>
                          <input type="text" placeholder='Digite o nome do prêmio'></input>
                      </div>
  
                      <div className={styles.other}>
                        <div className={styles.selects}>
                          <span>Ano da premiação</span>
                          <select required value={year} onChange={(event) => setYear(event.target.value)}>
                            
                            {year.map((date, idx) => {
                              return (
                                <option key={idx} value={date}>{date}</option>
                              )
                            })}
                            </select>
                        </div>

                        <div className={styles.selects}>
                          <span>Colocação</span>
                          <select required value={position} onChange={(event) => setPosition(event.target.value)}>
                            
                            {position.map((pos, idx) => {
                              return (
                                <option key={idx} value={pos}>{pos}º</option>
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
  const { crewId } = ctx.params;

  try {
    let { data } = await api.get(`/crews/${crewId}`);

    let crew = data;
    
    return {
      props: {
        crew
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
