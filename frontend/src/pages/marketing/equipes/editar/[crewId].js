import NavBar from "../../../../components/NavBar"
import api from "../../../../services/api";
import styles from "./styles.module.scss"
import Link from "next/link";

export default function Manage({ crew }){ 
  return (
    <div className={styles.all}>
      <NavBar/>

      <div className={styles.pageContent}>
        <div className={styles.content}>
          <Link href={`marketing/equipes/editar/${crew.id}/gerenciar-projetos`}>
            <button>
              <img src="/gerenciarProjetos.svg"></img>
              <span>Gerênciar Projetos</span>
            </button>
          </Link>

          <Link href={`marketing/equipes/editar/${crew.id}/gerenciar-premios`}>
            <button>
                <img src="/gerenciarPremios.svg"></img>
                <span>Gerênciar Prêmios</span>
              </button>
          </Link>

          <Link href={`marketing/equipes/editar/${crew.id}/editar-equipe`}>
            <button>
                <img src="/editarEquipe.svg"></img>
                <span>Editar Equipe</span>
              </button>
          </Link>

          <Link href={`marketing/equipes/editar/${crew.id}/excluir-equipe`}>
            <button>
              <img src="/excluirEquipe.svg"></img>
              <span>Excluir Equipe</span>
            </button>
          </Link>
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
