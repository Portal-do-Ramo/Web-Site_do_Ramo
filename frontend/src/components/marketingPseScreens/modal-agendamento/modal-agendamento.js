
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
      
      
    </> : null
  ) ;
}