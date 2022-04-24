import NavBar from "../../../../components/NavBar";
import api from "../../../../services/api";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function equipe({ crew }){ 
    const router = useRouter();

    function handleSelectOption(option) {
        router.push(`${crew.id}/${option}`);    
    }

    useEffect(() => {
      console.log(crew);
    }, [])

  return (
    <div className={styles.all}>
      <NavBar page="equipes"/>

      <div className={styles.pageContent}>
        <div className={styles.content}>
            <button type="button" onClick={() => handleSelectOption("projetos")}>
              <img src="/gerenciarProjetos.svg"></img>
              <span>Gerenciar Projetos</span>
            </button>

            <button type="button" onClick={() => handleSelectOption("premios")}>
                <img src="/gerenciarPremios.svg"></img>
                <span>Gerenciar Prêmios</span>
              </button>

            <button type="button" onClick={() => handleSelectOption("editar")}>
                <img src="/editarEquipe.svg"></img>
                <span>Editar Equipe</span>
              </button>

            <button type="button">
              <img src="/excluirEquipe.svg"></img>
              <span>Excluir Equipe</span>
            </button>
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
