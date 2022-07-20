import MarketingNavBar from "../../../../../../components/MarketingNavBar";
import api from "../../../../../../services/api";
import MarketingMenuRoutes from "../../../../../../components/MarketingMenuRoutes";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../../contexts/AuthContext";

export default function premioCriar({ crew }){ 
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

	const { user, isAuthenticated } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
		if (isAuthenticated) {
            if (user === null) {
                router.push("/login");
            } else {
				setIsLoading(false);
			}
        }
    }, [user, isAuthenticated]);

	if (isLoading) {
        return ( <></> )
    } else {
		return (
		  <div className={styles.all}>
			<MarketingNavBar page={"equipes"}/>
	  
			  <div className={styles.pageContent}>
				  <div className={styles.content}>
					  <MarketingMenuRoutes 
						routesName={`Equipes/${crew.name}/Prêmios/Criar`} 
						routes={`equipes/${crew.id}/premios/criar`}
					  />
	
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
