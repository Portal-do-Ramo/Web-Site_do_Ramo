import NavBar from "../../../../../../components/NavBar";
import api from "../../../../../../services/api";
import MarketingMenuRoutes from "../../../../../../components/MarketingMenuRoutes";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

export default function premioCriar({ crew, project }){ 
    const router = useRouter();

    function handleSelectOption(option) {
      router.push(`${crew.id}/${option}`);    
    }

    return (
      <div className={styles.all}>
        <NavBar page={"equipes"}/>
  
          <div className={styles.pageContent}>
              <MarketingMenuRoutes 
                routesName={`Equipes/${crew.name}/Projetos/${project.name}/Editar`} 
                routes={`equipes/${crew.id}/projetos/${project.id}/editar`}
              />

              <div className={styles.content}>
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
