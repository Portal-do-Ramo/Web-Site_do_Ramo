import MarketingNavBar from "../../../../../../../components/MarketingNavBar";
import api from "../../../../../../../services/api";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import MarketingMenuRoutes from "../../../../../../../components/MarketingMenuRoutes";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../../../contexts/AuthContext";

export default function projetoEditar({ crew, project }){ 
    const router = useRouter();

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
	
	function handleSelectOption(option) {
		router.push(`${crew.id}/${option}`);    
	}
	
	if (isLoading) {
		return ( <></> )
    } else {
		return (
		  <div className={styles.all}>
			<MarketingNavBar page={"equipes"}/>
	
			  <div className={styles.pageContent}>
				  <div className={styles.content}>
					  <MarketingMenuRoutes 
						routesName={`Equipes/${crew.name}/Projetos/${project.name}/Editar`} 
						routes={`equipes/${crew.id}/projetos/${project.id}/editar`}
					  />
					  
					  <h1>Editar Projeto</h1>
	  
					  <div className={styles.logoBanner}>
						  <div className={styles.logoHolder}>
							  <span>Logo do projeto</span>
							  <input type="image" alt=""></input>
						  </div>
	  
						  <div className={styles.bannerHolder}>
							  <span>Banner do projeto</span>
							  <input type="image" alt=""></input>
						  </div>
					  </div>
	  
					  <div className={styles.description}>
	  
						  <div className={styles.nameHolder}>
							  <span>Nome da equipe</span>
							  <input type="text" placeholder='Digite o nome da equipe'></input>
						  </div>
	  
						  <div className={styles.descriptionHolder}>
							  <span>Descrição da equipe</span>
							  <textarea placeholder='Digite a descrição da equipe'></textarea>
						  </div>
	  
						  <div className={styles.members}> 
							  <span>Membros do projeto</span>
							  <input placeholder='Digite um nome e pressione enter'></input>
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
  const { crewId, projectId } = ctx.params;

  try {
    let { data } = await api.get(`/crews/${crewId}`);

    let crew = data;
    let project = data.projects.find(project => project.id === Number(projectId));

    if (!project) {
        throw new Error("id do projeto não existe");
    }
    
    return {
      props: {
        crew,
        project
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
