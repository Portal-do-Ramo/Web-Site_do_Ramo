import { useEffect, useState } from "react"
import { FiDownload } from "react-icons/fi"
import { MdOutlineFileDownloadOff } from "react-icons/md"
import styles from "../PSE/styles.module.scss"

export default function PSENaoAgendado() {
  const [beginDate, setBeginDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isDownloadActive, setIsDownloadActive] = useState(false);

  useEffect(() => {
    var date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    setBeginDate(date.toISOString().slice(0, 16));
  }, [])

  return (
    <>
      <section id={styles.showInformation}>
          <img src="/pseilustration.svg"></img>
            <div className={styles.container}>
                <span>Não há registro de processo seletivo ativo</span>
                <p>Registre um novo PSE para habilitar outras funções</p>
            </div>           
      </section>

      <section className={styles.schedulePSESection}>
          <span>Cadastre um novo PSE!</span>
          <div className={styles.rowDates}>
              <div className={styles.begin}>
                  <input 
                    type="datetime-local"
                    max="9999-12-31T23:59"
                    name="beginDate"
                    id="beginDate"
                    onChange={(e) => setBeginDate(e.target.value)}
                    value={beginDate}
                  />
              </div>

              <p> até </p>

              <div className={styles.end}>
                <input
                  type="datetime-local"
                  max="9999-12-31T23:59"
                  name="endDate"
                  onChange={(e) => setEndDate(e.target.value)}
                  value={endDate}
                />
              </div>

              <button type='button'>Agendar</button>
          </div>
      </section>

      <section className={styles.downloadPSEFile}>
        <span>Baixe o arquivo do último PSE!</span>
        <button type="button" className={!isDownloadActive && styles.downloadButtonOff}>
          {isDownloadActive ? <FiDownload/> : <MdOutlineFileDownloadOff/> }
          Baixar
        </button>
      </section>
    </>
  )
}