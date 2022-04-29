import NavBar from "../../../../../../components/NavBar";
import Modal from 'react-modal';
import api from "../../../../../../services/api";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function projeto({ project }){ 
    const router = useRouter();
    const [modalIsOpen, setIsOpen] = useState(false);

    function handleSelectOption(option) {
        router.push(`${project.id}/${option}`);    
    }

    useEffect(() => {
        console.log(project);
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

            <section id={styles.upper}>
              <img></img>
              <div className={styles.nameSub}>
                <span>Site do Ramo</span>
                <p>{project.members.length} Membros</p>
              </div>
            </section>

            <section id={styles.lower}>
              <button type="button" onClick={() => handleSelectOption("editar")}>
                  <img src="/gerenciarProjetos.svg"></img>
                  <span>Editar Projeto</span>
                </button>
    
                <button type="button" onClick={openModal}>
                  <img src="/excluirEquipe.svg"></img>
                  <span>Excluir Projeto</span>
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
                    <h1>Excluir Projeto</h1>
                    <p>Tem certeza que você deseja excluir este projeto?</p>
                    <div className={styles.rowButton}>
                        <button type='button' className={styles.cancel} onClick={handleCloseModal}>Cancelar</button>
                        <button type='button' className={styles.shutDown}>Sim, excluir</button>
                    </div>
                </Modal>
            </section>
          </div>
        </div>
      </div>
    )
}

export async function getServerSideProps(ctx) {
  const { crewId, projectId } = ctx.params;

  try {
    let { data } = await api.get(`/crews/${crewId}`);

    let project = data.projects.find(project => project.id === Number(projectId));

    if (!project) {
        throw new Error("id do projeto não existe");
    }
    
    return {
      props: {
        project
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
