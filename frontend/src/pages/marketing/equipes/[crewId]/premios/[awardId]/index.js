import NavBar from "../../../../../../components/NavBar";
import Modal from 'react-modal';
import api from "../../../../../../services/api";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function premio({ crew, award }){ 
    const router = useRouter();
    const [modalIsOpen, setIsOpen] = useState(false);

    function handleSelectOption(option) {
        router.push(`${option}`);    
    }

    useEffect(() => {
        console.log(award);
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
              <img src={award.image}></img>
              <div className={styles.nameSub}>
                <span>{award.name}</span>
                <p>{award.year}</p>
              </div>
            </section>

            <section id={styles.lower}>
              <button type="button" onClick={() => handleSelectOption("editar")}>
                  <img src="/editarPremio.svg"></img>
                  <span>Editar Prêmio</span>
                </button>
    
                <button type="button" onClick={openModal}>
                  <img src="/excluirPremio.svg"></img>
                  <span>Excluir Prêmio</span>
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
                    <h1>Excluir Prêmio</h1>
                    <p>Tem certeza que você deseja excluir este prêmio?</p>
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
  const { crewId, awardId } = ctx.params;

  try {
    let { data } = await api.get(`/crews/${crewId}`);

    let award = data.awards.find(award => award.id === Number(awardId));
    
    if (!award) {
      throw new Error("id do projeto não existe");
    }

    return {
      props: {
        award
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
