import Modal from 'react-modal';
import { useEffect, useState } from "react";
import styles from "../PSE/styles.module.scss";
import { format, isBefore } from "date-fns";
import api from '../../../services/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function PSEAgendado({start, end}) {
	const [beginDate, setBeginDate] = useState(""); 
	const [endDate, setEndDate] = useState("");
	const [modalIsOpen, setIsOpen] = useState(false);
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

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
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
				<span>Editar PSE!</span>
				<div className={styles.rowDates}>
					<section className={styles.datesContainer}>
					<div className={styles.begin}>
						<input type="datetime-local" max="9999-12-31T23:59" name="beginDate" id="beginDateInput"/>
					</div>

					<p> até </p>

					<div className={styles.end}>
						<input type="datetime-local" max="9999-12-31T23:59" name="endDate" id="endDateInput"/>
					</div>
					</section>

					<button onClick={handleUpdatePSE}>Editar</button>
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
						<button className={styles.shutDown} onClick={handleCancelPSE}>Sim, cancelar</button>
					</div>
				</Modal>
			</section>
		</>
	)
}