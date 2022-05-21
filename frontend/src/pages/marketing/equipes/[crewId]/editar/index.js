import NavBar from "../../../../../components/NavBar";
import api from "../../../../../services/api";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import MarketingMenuRoutes from "../../../../../components/MarketingMenuRoutes";

export default function equipeEditar({ crew }){ 
    const router = useRouter();

    function handleSelectOption(option) {
        router.push(`${crew.id}/${option}`);    
    }

    return (
      <div className={styles.all}>
        <NavBar/>
  
          <div className={styles.pageContent}>
              <div className={styles.content}>
                <MarketingMenuRoutes
                  routesName={`Equipes/${crew.name}/Editar`} 
                  routes={`equipes/${crew.id}/editar`}
                />
                  <h1>Editar Equipe</h1>
  
                  <div className={styles.logoName}>
                      <div className={styles.logoHolder}>
                          <h1>Logo da equipe</h1>
                          <input type="image" alt=""></input>
                          
                      </div>
  
                      <div className={styles.nameHolder}>
                          <h1>Nome da equipe</h1>
                          <input type="text" placeholder='Digite o nome da equipe'></input>
  
                      </div>
                  </div>
  
                  <div className={styles.description}>
                      <h1>Descrição da equipe</h1>
                      <textarea placeholder='Digite a descrição da equipe'></textarea>
  
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
