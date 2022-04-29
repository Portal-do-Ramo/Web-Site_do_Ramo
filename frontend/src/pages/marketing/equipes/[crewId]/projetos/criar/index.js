import NavBar from "../../../../../../components/NavBar"
import styles from "../criar/styles.module.scss"

export default function CriarProjeto({ crew }){
  return (
    <div className={styles.all}>
      <NavBar/>

        <div className={styles.pageContent}>
            <div className={styles.content}>
                <h1>Criar Projeto</h1>

                <div className={styles.logoBanner}>
                    <div className={styles.logoHolder}>
                        <h1>Logo do projeto</h1>
                        <input type="image" alt=""></input>
                    </div>

                    <div className={styles.BannerHolder}>
                        <h1>Banner do projeto</h1>
                        <input type="image" alt=""></input>
                    </div>
                </div>

                <div className={styles.description}>

                    <div className={styles.nameHolder}>
                        <h1>Nome da equipe</h1>
                        <input type="text" placeholder='Digite o nome da equipe'></input>
                    </div>

                    <div className={styles.descriptionHolder}>
                        <h1>Descrição da equipe</h1>
                        <textarea placeholder='Digite a descrição da equipe'></textarea>
                    </div>
                </div>

                <div className={styles.buttonRow}>
                    <button className={styles.cancel}>Cancelar</button>
                    <button className={styles.edit}>Criar</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export async function getServerSideProps(ctx) {
    const { projectId } = ctx.params;
  
    try {
      let { data } = await api.get(`/projetos/${projectId}`);
      
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