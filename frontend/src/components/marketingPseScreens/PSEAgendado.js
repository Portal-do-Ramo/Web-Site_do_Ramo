import { useEffect, useState } from "react";
import { format, isBefore } from "date-fns";
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

import styles from "../../pages/marketing/PSE/styles.module.scss";
import api from '../../services/api';


function PSEAgendado({ start, end }) {
	const [beginDate, setBeginDate] = useState(""); 
	const [endDate, setEndDate] = useState("");
	const [firstDay, setFirstDay] = useState('');
  const [secondDay, setSecondDay] = useState('');
  const [thirdDay, setThirdDay] = useState('');
  const [fourthDay, setFourthDay] = useState('');
	const [cancelPSEModalIsOpen, setCancelPSEModalIsOpen] = useState(false);

	const [showAgendamento, setShowAgendamento] = useState(false);
	const [editPSEModalIsOpen, setEditPSEModalIsOpen] = useState(false);
	const router = useRouter();
	

	useEffect(() => {
		setBeginDate(format(new Date(start), "dd/MM/yyyy - H:mm"));
		setEndDate(format(new Date(end), "dd/MM/yyyy - H:mm"));

		let beginDateFormatted = new Date(start);
		beginDateFormatted.setMinutes(beginDateFormatted.getMinutes() - beginDateFormatted.getTimezoneOffset());
		
		let endDateFormatted = new Date(end);
		endDateFormatted.setMinutes(endDateFormatted.getMinutes() - endDateFormatted.getTimezoneOffset());
	
		document.getElementById("beginDateInput").value = beginDateFormatted.toISOString().slice(0, 16);
		document.getElementById("endDateInput").value = endDateFormatted.toISOString().slice(0, 16);
	}, []);

	async function handleReSchedulePSE() {
		const date = new Date();

		let offset = date.getTimezoneOffset();

		offset = offset / 60 -1;
		offset = "00" + offset;

		let schedulePSEObject = {
			startDate: `${beginDate}:00.000-0${offset.slice(-1)}:00`,
			endDate: `${endDate}:00.000-0${offset.slice(-1)}:00`,
			dinamycDate_1: `${firstDay}:00.000-0${offset.slice(-1)}:00`,
			dinamycDate_2: `${secondDay}:00.000-0${offset.slice(-1)}:00`,
			dinamycDate_3: `${thirdDay}:00.000-0${offset.slice(-1)}:00`,
			dinamycDate_4: `${fourthDay}:00.000-0${offset.slice(-1)}:00`,
			
		}

		try {
			console.log(schedulePSEObject)
			
			await toast.promise(
				api.post("/pse/schedule", schedulePSEObject),
				{
					pending: 'Carregando',
					success: 'Datas do PSE atualizadas ',
					error: 'Não foi possível atualizar o PSE'
				}
			)
		
			setTimeout(() => {
				router.reload();
			}, 2000);

		} catch (error) {
			console.error(error);
			return null;
		}
	}

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
		const date = new Date();

		let offset = date.getTimezoneOffset();

		offset = offset / 60;

		offset = "00" + offset;

		offset = offset.slice(-2);

		let beginDateFormatted = `${document.getElementById("beginDateInput").value}:00.000-${offset}:00`;

		try {
			await toast.promise(
				api.patch("/pse/schedule",
				{ 
					startDate: beginDateFormatted,
					endDate: `${document.getElementById("endDateInput").value}:00.000-${offset}:00`
				}
				),
				{
					pending: 'Carregando',
					success: 'PSE atualizado!',
					error: 'Não foi possível atualizar o PSE'
				}
			)

			setBeginDate(
				format(new Date(document.getElementById("beginDateInput").value), 
				"dd/MM/yyyy - H:mm")
			);
	
			setEndDate (
				format(new Date(document.getElementById("endDateInput").value),
				"dd/MM/yyyy - H:mm")
			);

			if (isBefore(new Date(beginDateFormatted), date)) {
				setTimeout(() => {
					router.reload();
				}, 2000);	
			}
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
					className={styles.modal2}
					overlayClassName={styles.overlay}
					contentLabel="Example Modal"
				>
					<div className={styles.modalEdit}>
						<h2>Edição das dinâmicas</h2>
						<div className={styles.InputsBlock}>
									<div className={styles.days}>
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
												
											/>
									</div>
									<div className={styles.days}>
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
											
										/>
									</div>
									<div className={styles.days}>
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
												
											/>
									</div>
									<div className={styles.days}>
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
												
											/>            
									</div>
									
									
									<div className={styles.buttonsBox}>
										<button className={styles.Cancel} onClick={closeEditPSEModal}>Cancelar</button>
										<button className={styles.Create} type="submit" onClick={handleReSchedulePSE}>Finalizar</button>
								</div>
									
									
								</div>
							</div>
					
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