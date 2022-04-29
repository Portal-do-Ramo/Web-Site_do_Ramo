import NavBar from "../../../../components/NavBar";
import Modal from 'react-modal';
import api from "../../../../services/api";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function equipe({ crew }){ 
    const router = useRouter();
    const [modalIsOpen, setIsOpen] = useState(false);

    function handleSelectOption(option) {
        router.push(`${crew.id}/${option}`);    
    }

    useEffect(() => {
      console.log(crew);
    }, [])

    function openModal() {
      setIsOpen(true);
    }
  
    function handleCloseModal() {
      setIsOpen(false);
    }

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

            <button type="button" onClick={openModal}>
              <img src="/excluirEquipe.svg"></img>
              <span>Excluir Equipe</span>
            </button>

            <Modal 
            isOpen={modalIsOpen}
            onRequestClose={handleCloseModal}
            className={styles.modal}
            overlayClassName={styles.overlay}
            contentLabel="Example Modal"
            shouldCloseOnEsc={true}  
            >
              <img src="/cancel.svg"></img>
              <h1>Excluir Equipe</h1>
              <p>Tem certeza que você deseja excluir esta equipe?</p>
              <div className={styles.rowButton}>
                  <button type='button' className={styles.cancel} onClick={handleCloseModal}>Cancelar</button>
                  <button type='button' className={styles.shutDown}>Sim, excluir</button>
              </div>
           </Modal>
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
