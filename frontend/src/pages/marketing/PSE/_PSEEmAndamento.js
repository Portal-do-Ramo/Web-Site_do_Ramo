import Modal from 'react-modal';
import { useEffect, useState } from "react";
import styles from "../PSE/styles.module.scss"

export default function PSEEmAndamento() {
  const beginDate = "03/04/2022 - 00:00h";
  const endDate = "05/04/2022 - 00:00h";

  const [modalIsOpen, setIsOpen] = useState(false);

 /* useEffect(() => {
    var date = new Date("2022-04-22T00:00:00.000Z");
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    document.getElementById('beginDate').value = date.toISOString().slice(0, 16);
  }, [])
*/

  function openModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  function handleEditPSE() {

  }

  return (
    <>
      <section className={styles.showInformation}>
          <img src="/pseilustration.svg"></img>
          <div className={styles.container}>
            <span>Processo seletivo em andamento!</span>
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
              <div className={styles.beginFixed}>
                <p>{beginDate}</p>
              </div>

              <p> até </p>

              <div className={styles.end}>
                <input type="datetime-local" max="9999-12-31T23:59"  name="endDate"/>
              </div>
            </section>

              <button>Editar</button>
          </div>
      </section>

      <section className={styles.terminatePSE}>
          <span>Encerrar o PSE!</span>
          <p>
              Ao cancelar o processo seletivo externo as informações
              de início e término do processo serão removidas.
          </p>

          <button onClick={openModal}>Encerrar PSE</button>

          <Modal 
            isOpen={modalIsOpen}
            onRequestClose={handleCloseModal}
            className={styles.modal}
            overlayClassName={styles.overlay}
            contentLabel="Example Modal"
            shouldCloseOnEsc={true}  
          >
              <img src="/finish.svg"></img>
              <h1>Encerrar PSE</h1>
              <p>Tem certeza que você deseja cancelar o PSE?</p>
              <div className={styles.rowButton}>
                  <button type='button' className={styles.cancel} onClick={handleCloseModal}>Cancelar</button>
                  <button type='button' className={styles.finishButton}>Sim, encerrar</button>
              </div>
          </Modal>

      </section>
    </>
  )
}