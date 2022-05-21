import Modal from 'react-modal';
import { useEffect, useState } from "react";
import styles from "../PSE/styles.module.scss"

export default function PSENaoAgendado() {
  const beginDate = "03/04/2022 - 00:00h";
  const endDate = "05/04/2022 - 00:00h";

  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    var date = new Date("2022-04-22T00:00:00.000Z");
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
      <section id={styles.showInformation}>
          <img src="/pseilustration.svg"></img>
            <div className={styles.container}>
                <span>Não há registro de processo seletivo ativo</span>
                <p>Registre um novo PSE para habilitar outras funções</p>
            </div>           
      </section>

      <section id={styles.create_edit}>
          <span>Cadastre um novo PSE!</span>
          <div className={styles.rowDates}>
              <div className={styles.begin}>
                  <input type="datetime-local" max="9999-12-31T23:59" name="beginDate" id="beginDate"/>
              </div>

              <p> até </p>

              <div className={styles.end}>
                  <input type="datetime-local" max="9999-12-31T23:59" name="endDate"/>
              </div>

              <button>Agendar</button>
          </div>
      </section>
    </>
  )
}