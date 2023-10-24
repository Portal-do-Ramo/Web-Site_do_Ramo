
import {PlusCircle} from "phosphor-react"

export default function Agendamento(){
  const setHidden = hidden ? 'hidden' : '';

  return(
    <>
      <div className={`${styles.modal}${setHidden}`}>
        <h2>Agendamento das dinâmicas</h2>
        <div className={styles.modal.InputsBlock}>
          <div className={styles.modal.InputsBlock.first}>
            <label for="firstDay">1° Dia:</label>
            <input id="firstDay" placeholder="dd/mm/yy" type="date"/>
            <div className={styles.modal.InputsBlock.Line}></div>
            <input placeholder="00:00" type="time"/>
          </div>
          <div className={styles.modal.InputsBlock.second}>
            <label for="secondDay">2° Dia:</label>
            <input type="date" id="secondDay" placeholder="dd/mm/yy"/>
            <div className={styles.modal.InputsBlock.Line}></div>
            <input type="time" placeholder="00:00"/>
          </div>
          <div className={styles.modal.InputsBlock.third}>
            <label for="thirdDay">2° Dia:</label>
            <input type="date" id="thirdDay" placeholder="dd/mm/yy"/>
            <div className={styles.modal.InputsBlock.Line}></div>
            <input type="time" placeholder="00:00"/>
          </div>
          <div className={styles.modal.InputsBlock.fourth}>
            <label for="fourthDay">2° Dia:</label>
            <input type="date" id="fourthDay" placeholder="dd/mm/yy"/>
            <div className={styles.modal.InputsBlock.Line}></div>
            <input type="time" placeholder="00:00"/>
          </div>
          <PlusCircle size={20} weight="fill" />
        </div>
        <div>
          <button className={styles.modal.Cancel}>Cancelar</button>
          <button className={styles.modal.Create} type="submit">Criar PSE</button>
        </div>
      </div>
    </>
  )
}