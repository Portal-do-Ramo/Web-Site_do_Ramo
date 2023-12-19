import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

import styles from "../../pages/marketing/PSE/styles.module.scss";
import api from '../../services/api';


function PSEAgendado({ start, end }) {
	const [beginDate, setBeginDate] = useState(""); 
	const [endDate, setEndDate] = useState("");
	const [firstDay, setFirstDay] = useState('');
  const [secondDay, setSecondDay] = useState('');
  const [thirdDay, setThirdDay] = useState('');
  const [fourthDay, setFourthDay] = useState('');

  const [fifthDay, setFifthDay] = useState('');
	const [showFifthDay, setShowFifthDay] = useState(false);

	const [cancelPSEModalIsOpen, setCancelPSEModalIsOpen] = useState(false);
	const [editPSEModalIsOpen, setEditPSEModalIsOpen] = useState(false);
	const router = useRouter();
	const adjustTime = (date) => new Date(new Date(date).getTime() - (3 * 60 * 60 * 1000));
	
	useEffect(() => {

		const dateFormatterOptions = {
			timeZone: 'America/Sao_Paulo',
			hour: 'numeric',
			minute: 'numeric',
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		};
		
		const dateTimeFormatter = new Intl.DateTimeFormat('pt-BR', dateFormatterOptions);
		
		const formattedStartDate = dateTimeFormatter.format(new Date(start));
		const formattedEndDate = dateTimeFormatter.format(new Date(end));
		
		setBeginDate(`${formattedStartDate.split(',')[0]} - ${formattedStartDate.split(' ')[1]}`);
		setEndDate(`${formattedEndDate.split(',')[0]} - ${formattedEndDate.split(' ')[1]}`);
		

		let beginDateFormatted = new Date(start);
		// beginDateFormatted.setMinutes(beginDateFormatted.getMinutes() - beginDateFormatted.getTimezoneOffset());
		beginDateFormatted.setUTCHours(beginDateFormatted.getUTCHours() - 3); // muda para a hora do brasil



		let endDateFormatted = new Date(end);
		// endDateFormatted.setMinutes(endDateFormatted.getMinutes() - endDateFormatted.getTimezoneOffset());
		endDateFormatted.setUTCHours(endDateFormatted.getUTCHours() - 3); // muda para a hora do brasil

	
		document.getElementById("beginDateInput").value = beginDateFormatted.toISOString().slice(0, 16);
		document.getElementById("endDateInput").value = endDateFormatted.toISOString().slice(0, 16);
		getDinamycDatesPSE();
	}, []);


	function converterData(dateString) {
    const match = dateString.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
      
    /* 
      Usar classe new Date

      2023-11-13T06:00:00.000Z 
      2023-11-13T03:00
    */
      // console.log('dateString: ', dateString)
    // console.log('new Date: ', new Date(dateString))


    if (!match) {
        throw new Error("Formato de entrada inválido. Use yyyy-MM-ddThh:mm.");
    }

    const [, ano, mes, dia, hora, minuto] = match;
    
    if (parseInt(mes) < 1 || parseInt(mes) > 12 || parseInt(dia) < 1 || parseInt(dia) > 31 || parseInt(hora) < 0 || parseInt(hora) > 23 || parseInt(minuto) < 0 || parseInt(minuto) > 59) {
        throw new Error("Valores de data ou hora fora do intervalo válido.");
    }

    const isoDate = `${ano}-${mes}-${dia}T${hora}:${minuto}`;
		return isoDate;
}
	async function getDinamycDatesPSE() {

		try {
			// const response = await api.get("/dinamycDates");
			const response = await api.get("/pse");
			const { dinamycDate_1, dinamycDate_2, dinamycDate_3, dinamycDate_4, dinamycDate_5 } = response.data;
			// setFirstDay(converterData(dinamycDate_1));
			// setSecondDay(converterData(dinamycDate_2));
			// setThirdDay(converterData(dinamycDate_3));
			// setFourthDay(converterData(dinamycDate_4));
			// setFifthDay(converterData(dinamycDate_5));

			setFirstDay(adjustTime(dinamycDate_1).toISOString().slice(0, 16));
			setSecondDay(adjustTime(dinamycDate_2).toISOString().slice(0, 16));
			setThirdDay(adjustTime(dinamycDate_3).toISOString().slice(0, 16));
			setFourthDay(adjustTime(dinamycDate_4).toISOString().slice(0, 16));
			dinamycDate_5 ? setFifthDay(adjustTime(dinamycDate_5).toISOString().slice(0, 16)) : null
			
		} catch (error) {

			console.error(error);
			return null;
		}
	}

	// async function handleReSchedulePSE() {
	// 	const date = new Date();

	// 	let offset = date.getTimezoneOffset();

	// 	offset = offset / 60 -1;
	// 	offset = "00" + offset;

	// 	let schedulePSEObject = {
	// 		startDate: `${beginDate}:00.000-0${offset.slice(-1)}:00`,
	// 		endDate: `${endDate}:00.000-0${offset.slice(-1)}:00`,
	// 		dinamycDate_1: `${firstDay}:00.000-0${offset.slice(-1)}:00`,
	// 		dinamycDate_2: `${secondDay}:00.000-0${offset.slice(-1)}:00`,
	// 		dinamycDate_3: `${thirdDay}:00.000-0${offset.slice(-1)}:00`,
	// 		dinamycDate_4: `${fourthDay}:00.000-0${offset.slice(-1)}:00`,
			
	// 	}

	
	// 	try {
	// 		console.log(schedulePSEObject)
			
	// 		await toast.promise(
	// 			api.post("/pse/schedule", schedulePSEObject),
	// 			{
	// 				pending: 'Carregando',
	// 				success: 'Datas do PSE atualizadas ',
	// 				error: 'Não foi possível atualizar o PSE'
	// 			}
	// 		)
		
	// 		setTimeout(() => {
	// 			router.reload();
	// 		}, 2000);

	// 	} catch (error) {
	// 		console.error(error);
	// 		return null;
	// 	}
	// }

	function openCancelPSEModal() {
		setCancelPSEModalIsOpen(true);
	}
	function closeCancelPSEModal() {
		setCancelPSEModalIsOpen(false);
	}
	function openEditPSEModal(){

		setEditPSEModalIsOpen(true);
	}
	function closeEditPSEModal(){
		setEditPSEModalIsOpen(false);
	}

	async function handleUpdatePSE() {
/* 		const date = new Date();

		let offset = date.getTimezoneOffset();

		offset = offset / 60;

		offset = "00" + offset;
*/
		let beginDateFormatted = `${document.getElementById("beginDateInput").value}:00.000-03:00`;
    let endDateFormatted = `${document.getElementById("endDateInput").value}:00.000-03:00`; 
    
		let schedulePSEObject = {
			startDate: beginDateFormatted,
			endDate: endDateFormatted,
			dinamycDate_1: `${firstDay}:00.000-03:00`,
			dinamycDate_2: `${secondDay}:00.000-03:00`,
			dinamycDate_3: `${thirdDay}:00.000-03:00`,
			dinamycDate_4: `${fourthDay}:00.000-03:00`,
			dinamycDate_5: fifthDay ? `${fifthDay}:00.000-03:00` : null 
		}
		try {
			await Promise.all([
				toast.promise(
					api.patch("/pse/schedule", schedulePSEObject),
					{
						pending: 'Carregando',
						success: 'PSE atualizado!',
						error: 'Não foi possível atualizar o PSE'
					}
				),
				!fifthDay ?
					toast.promise(
						api.patch(`/pse/dinamycDate/dinamycDate_5`),
						{
							pending: 'Carregando',
							success: 'PSE sem 5ª dinâmica!',
							error: 'Não foi possível atualizar a dinâmica 5'
						}
					) :
					null
			]);


			setTimeout(() => {
				router.reload();
			}, 2000);
		} catch (error) {
			return null;
		}
	}

	async function handleCancelPSE() {
		await api.delete("/pse/schedule");
		router.reload();
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
				<h2>Editar PSE!</h2>
				<div className={styles.rowDates}>
					<section className={styles.datesContainer}>
						<div className={styles.begin}>
							<input className={styles.dateInput} type="datetime-local" max="9999-12-31T23:59" name="beginDate" id="beginDateInput"/>
						</div>

						<p> até </p>

						<div className={styles.end}>
							<input className={styles.dateInput} type="datetime-local" max="9999-12-31T23:59" name="endDate" id="endDateInput"/>
						</div>
					</section>

					{/* <button onClick={handleUpdatePSE}>Editar</button> */}
					{/* <button onClick={()=>setShowAgendamento(!showAgendamento)}>Editar</button> */}
					<button onClick={openEditPSEModal}>Editar</button>
						
				</div>
			</section>
				{/* Colocar o modal de editar */}
				<Modal 
						isOpen={editPSEModalIsOpen}
						onRequestClose={closeEditPSEModal}
						className={styles.modal}
						overlayClassName={styles.overlay}
						contentLabel="Example Modal"
					>
						<div className={styles.modalAgendamento}>
							<h2>Editar datas das dinâmicas</h2>
							<div className={styles.InputsBlock}>
								<div className={styles.days}>
									<label htmlFor="firstDay">1° Dia:</label>
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
								<div className={styles.days}>
									<label htmlFor="secondDay">2° Dia:</label>
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
								<div className={styles.days}>
									<label htmlFor="thirdDay">3° Dia:</label>
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
								<div className={styles.days}>
									<label htmlFor="fourthDay">4° Dia:</label>
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
								{fifthDay || showFifthDay ? (
									<>
										<div className={styles.days}>
											<label htmlFor="fifthDay">5° Dia:</label>
											{/* <input type="date" id="fifthDay" placeholder="dd/mm/yy"/>
											<div className={styles.Line}></div>
											<input type="time" placeholder="00:00"/> */} 
		
												<input 
													type="datetime-local"
													max="9999-12-31T23:59"
													name="fifthDay"
													id="fifthDay"
													onChange={(e) => setFifthDay(e.target.value)}
													value={fifthDay}
												/>            
										</div>
										<button type="button" className={styles.addDay} onClick={()=>{
											setShowFifthDay(false)
											setFifthDay('')
										}}>
											<AiOutlineMinusCircle />
										</button>
											
									</>
									):(
										<button type="button" className={styles.addDay} onClick={()=>setShowFifthDay(true)}>
											<AiOutlinePlusCircle />
										</button>
									)
								}

								{/* <CiCirclePlus size={20} weight="fill" /> */}
								
							</div>
							<div className={styles.buttonsBox}>
								<button className={styles.Cancel} onClick={closeEditPSEModal}>Cancelar</button>
								<button className={styles.Create} type="submit" onClick={handleUpdatePSE}>Atualizar PSE</button>
							</div>
						</div>
						{/* <Agendamento beginDate={beginDate} endDate={endDate}/> */}
					</Modal>

			<section className={styles.cancelPSE}>
				<span>Cancelar o PSE!</span>
				<p>
					Ao cancelar o processo seletivo externo as informações
					de início e término do processo serão removidas.
				</p>

				<button onClick={openCancelPSEModal}>Cancelar PSE</button>
				<Modal 
					isOpen={cancelPSEModalIsOpen}
					onRequestClose={closeCancelPSEModal}
					className={styles.modal}
					overlayClassName={styles.overlay}
					contentLabel="Example Modal"
				>
					<img src="/cancel.svg"></img>
					<h1>Cancelar PSE</h1>
					<p>Tem certeza que você deseja cancelar o PSE?</p>
					<div className={styles.rowButton}>
						<button className={styles.cancel} onClick={closeCancelPSEModal}>Cancelar</button>
						<button className={styles.shutDown} onClick={handleCancelPSE}>Sim, cancelar</button>
					</div>
				</Modal>
			</section>
		</>
	)
}

export {PSEAgendado};