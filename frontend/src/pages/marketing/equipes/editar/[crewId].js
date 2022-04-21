import NavBar from "../../../../components/NavBar"
import api from "../../../../services/api";
import styles from "../editar/styles.module.scss"

export default function Manage({ crew }){
  return (
    <div className={styles.all}>
      <NavBar/>

      <div className={styles.pageContent}>
        <div className={styles.content}>
          <div className={styles.upperRow}>
            <button>
              <img src="/gerenciarProjetos.svg"></img>
              <span>Gerênciar Projetos</span>
            </button>

            <button>
              <img src="/gerenciarPremios.svg"></img>
              <span>Gerênciar Prêmios</span>
            </button>
          </div>

          <div className={styles.lowerRow}>
            <button>
              <img src="/editarEquipe.svg"></img>
              <span>Editar Equipe</span>
            </button>

            <button>
              <img src="/excluirEquipe.svg"></img>
              <span>Excluir Equipe</span>
            </button>
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
