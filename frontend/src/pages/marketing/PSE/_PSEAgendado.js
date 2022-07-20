import Modal from 'react-modal'; //falta fazer o modal!! npm install react-modal
import { useEffect, useState } from "react";
import styles from "../PSE/styles.module.scss"

export default function PSEAgendado({startDate, end}) {
  const beginDate = "03/04/2022 - 00:00h";
  const endDate = "05/04/2022 - 00:00h";

  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let date = new Date("2022-04-22T00:00:00.000Z");
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    document.getElementById('beginDate').value = date.toISOString().slice(0, 16);
  }, [])

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleEditPSE() {

  }

  return (
    <>
      <section className={styles.showInformation}>
          <img src="/pseilustration.svg"></img>
            <div className={styles.container}>
                <span>Processo seletivo agendado!</span>
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
      </section>

      <section className={styles.schedulePSESection}>
          <span>Editar PSE!</span>
          <div className={styles.rowDates}>
            <section className={styles.datesContainer}>
              <div className={styles.begin}>
                <input type="datetime-local" max="9999-12-31T23:59" name="beginDate" id="beginDate"/>
              </div>

              <p> até </p>

              <div className={styles.end}>
                <input type="datetime-local" max="9999-12-31T23:59" name="endDate"/>
              </div>
            </section>

              <button>Editar</button>
          </div>
      </section>

      <section className={styles.cancelPSE}>
          <span>Cancelar o PSE!</span>
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
                  <button className={styles.cancel} onClick={closeModal}>Cancelar</button>
                  <button className={styles.shutDown}>Sim, cancelar</button>
              </div>
          </Modal>
      </section>
    </>
  )
}