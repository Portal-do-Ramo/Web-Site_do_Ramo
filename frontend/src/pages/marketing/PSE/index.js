import NavBar from "../../../components/NavBar"
import styles from "../PSE/styles.module.scss"
import Modal from 'react-modal'; //falta fazer o modal!! npm install react-modal
import { useState } from "react";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

export default function PSE(){
let psecontroler = true;
const beginDate = "03/04/2022 - 00:00h";
const endDate = "05/04/2022 - 00:00h";

const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className={styles.all}>
      <NavBar/>

        <div className={styles.pageContent}>
            <div className={styles.content}>
                <section id={styles.showInformation}>
                    <img src="/pseilustration.svg"></img>
                    { psecontroler 
                       ? 
                        <div className={styles.container}>
                            <h1>Processo seletivo agendado!</h1>
                            <div className={styles.dates}>
                                <div className={styles.begin}>
                                    {beginDate}
                                </div>

                                <div className={styles.divider}></div>

                                <div className={styles.end}>
                                    {endDate}
                                </div>
                            </div>
                        </div> 

                       :
                        <div className={styles.container}>
                            <h1>Não há registro de processo seletivo ativo</h1>
                            <p>Registre um novo PSE para habilitar outras funções</p>
                        </div> 
                        
                    }
                </section>

                <section id={styles.create_edit}>
                    <h1>{psecontroler ? "Editar PSE" : "Cadastre um novo PSE"}</h1>
                    <div className={styles.rowDates}>
                        <div className={styles.begin}>
                            {beginDate}
                        </div>

                        até

                        <div className={styles.end}>
                            {endDate}
                        </div>

                        <button>{psecontroler ? "Editar" : "Agendar"}</button>
                    </div>
                </section>

                <section id={styles.cancelPSE}>
                    <h1>Cancelar o PSE!</h1>
                    <p>
                        Ao cancelar o processo seletivo externo as informações
                        de início e término do processo serão removidas.
                    </p>

                    <button onClick={openModal}>Cancelar PSE</button>
                    <Modal 
                     isOpen={modalIsOpen}
                     onRequestClose={closeModal}
                     className={styles.modal}
                     overlayClassName={styles.overlay}
                     contentLabel="Example Modal"
                    >
                        <img src="/cancel.svg"></img>
                        <h1>Cancelar PSE</h1>
                        <p>Tem certeza que você deseja cancelar o PSE?</p>
                        <div className={styles.rowButton}>
                            <button className={styles.cancel}>Cancelar</button>
                            <button className={styles.shutDown}>Sim, encerrar</button>
                        </div>
                    </Modal>
                </section>
            </div>
        </div>
    </div>
  )
}
