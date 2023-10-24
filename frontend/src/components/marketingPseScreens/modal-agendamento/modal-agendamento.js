
// import {PlusCircle} from "phosphor-react"
import styles from "./styles.module.scss";
import React, { useState } from 'react';
import { toast } from "react-toastify";

export default function Agendamento({show = true, beginDate, endDate}){

  const [firstDay, setFirstDay] = useState('');
  const [secondDay, setSecondDay] = useState('');
  const [thirdDay, setThirdDay] = useState('');
  const [fourthDay, setFourthDay] = useState('');


  async function handleSchedulePSE() {
		const date = new Date();

		let offset = date.getTimezoneOffset();

		offset = offset / 60;

		offset = "00" + offset;

		try {
      console.log({
        startDate: `${beginDate}-00:000-${offset.slice(-1)}:00`,
        endDate: `${endDate}-00:000-${offset.slice(-1)}:00`,
        dinamycDate_1: `${firstDay}-00:000-${offset.slice(-1)}:00`,
        dinamycDate_2: `${secondDay}-00:000-${offset.slice(-1)}:00`,
        dinamycDate_3: `${thirdDay}-00:000-${offset.slice(-1)}:00`,
        dinamycDate_4: `${fourthDay}-00:000-${offset.slice(-1)}:00`,
      })  
			// await toast.promise(
			// 	api.post("/pse/schedule",
      //     {
      //       startDate: `${beginDate}-00:000-${offset.slice(-1)}:00`,
      //       endDate: `${endDate}-00:000-${offset.slice(-1)}:00`,
      //       dinamycDate_1: firstDay,
      //       dinamycDate_2: secondDay,
      //       dinamycDate_3: thirdDay,
      //       dinamycDate_4: fourthDay
      //     }				
			// 	),
			// 	{
			// 		pending: 'Carregando',
			// 		success: 'Novo PSE agendado',
			// 		error: 'Não foi possível agendar um novo PSE'
			// 	}
			// )
		
			// setTimeout(() => {
			// 	router.reload();
			// }, 2000);

		} catch (error) {
			return null;
		}
	}

  return(
    show ? <>
      
      <div className={`${styles.modal}`}>
        <h2>Agendamento das dinâmicas</h2>
        <div className={styles.modal.InputsBlock}>
          <div className={styles.first}>
            <label for="firstDay">1° Dia:</label>
            {/* <input id="firstDay" placeholder="dd/mm/yy" type="date"/>
            <div className={styles.Line}></div>
            <input placeholder="00:00" type="time"/> */}
            <input 
								type="datetime-local"
								max="9999-12-31T23:59"
								name="firstDay"
								id="firstDay"
								onChange={(e) => setFirstDay(e.target.value)}
								value={firstDay}
							/>
          </div>
          <div className={styles.second}>
            <label for="secondDay">2° Dia:</label>
            {/* <input type="date" id="secondDay" placeholder="dd/mm/yy"/>
            <div className={styles.Line}></div>
            <input type="time" placeholder="00:00"/> */}
              <input 
								type="datetime-local"
								max="9999-12-31T23:59"
								name="secondDay"
								id="secondDay"
								onChange={(e) => setSecondDay(e.target.value)}
								value={secondDay}
							/>
          </div>
          <div className={styles.third}>
            <label for="thirdDay">3° Dia:</label>
            {/* <input type="date" id="thirdDay" placeholder="dd/mm/yy"/>
            <div className={styles.Line}></div>
            <input type="time" placeholder="00:00"/> */}
              <input 
								type="datetime-local"
								max="9999-12-31T23:59"
								name="thirdDay"
								id="thirdDay"
								onChange={(e) => setThirdDay(e.target.value)}
								value={thirdDay}
							/>
          </div>
          <div className={styles.fourth}>
             <label for="fourthDay">4° Dia:</label>
            {/* <input type="date" id="fourthDay" placeholder="dd/mm/yy"/>
            <div className={styles.Line}></div>
            <input type="time" placeholder="00:00"/> */} 

              <input 
								type="datetime-local"
								max="9999-12-31T23:59"
								name="fourthDay"
								id="fourthDay"
								onChange={(e) => setFourthDay(e.target.value)}
								value={fourthDay}
							/>            
          </div>
          {/* <PlusCircle size={20} weight="fill" /> */}
        </div>
        <div>
          <button className={styles.modal.Cancel}>Cancelar</button>
          <button className={styles.modal.Create} type="submit" onClick={handleSchedulePSE}>Criar PSE</button>
        </div>
      </div>
    </> : null
  ) ;
}