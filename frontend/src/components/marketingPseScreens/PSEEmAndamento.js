import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { format } from "date-fns";
import Modal from 'react-modal';

import { FiDownload } from "react-icons/fi";
import { MdOutlineFileDownloadOff } from "react-icons/md";

async function handleDownloadPSEFile() {
	const { data } = await api.get("/download/pse.csv", { responseType: "blob" });
	const url = window.URL.createObjectURL(new Blob([data]));
	const link = document.createElement('a');
	link.href = url;
	link.setAttribute('download', 'pse.csv');
	link.click();
}

import styles from "../../pages/marketing/PSE/styles.module.scss";
import api from '../../services/api';

function PSEEmAndamento({ start, end, isDownloadActive }) {
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

	function handleCloseModal() {
		setIsOpen(false);
	}

	async function handleUpdatePSE() {
		const date = new Date();

		let offset = date.getTimezoneOffset();

		offset = offset / 60;

		offset = "00" + offset;

		offset = offset.slice(-2);

		try {
			await toast.promise(
				api.patch("/pse/schedule",
				{ 
					startDate: `${document.getElementById("beginDateInput").value}:00.000-${offset}:00`,
					endDate: `${document.getElementById("endDateInput").value}:00.000-${offset}:00`
				}
				),
				{
					pending: 'Carregando',
					success: 'PSE atualizado!',
					error: 'Não foi possível atualizar o PSE'
				}
			)
	
			setEndDate (
				format(new Date(document.getElementById("endDateInput").value),
				"dd/MM/yyyy - H:mm")
			);
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
						<input
							type="datetime-local"
							max="9999-12-31T23:59"
							name="beginDate"
							id="beginDateInput"
							className={styles.beginDateInputOff}
							disabled={true}
						/>
					</div>

					<p> até </p>

					<div className={styles.end}>
						<input
							type="datetime-local"
							max="9999-12-31T23:59"
							name="endDate"
							id='endDateInput'
						/>
					</div>
					</section>

					<button type='button' onClick={handleUpdatePSE}>Editar</button>
				</div>
			</section>

			<section className={styles.downloadPSEFile}>
				<span>Baixe o arquivo do último PSE!</span>
				<button
					type="button"
					className={!isDownloadActive ? styles.downloadButtonOff : ""}
					onClick={handleDownloadPSEFile}
					disabled={!isDownloadActive}
				>
					{isDownloadActive ? <FiDownload /> : <MdOutlineFileDownloadOff />}
					Baixar
				</button>
			</section>

			<section className={styles.closePSE}>
				<span>Encerrar o PSE!</span>
				<p>
					Ao cancelar o processo seletivo externo as informações
					de início e término do processo serão removidas.
				</p>

				<button type='button' onClick={openModal}>Encerrar PSE</button>

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
						<button type='button' className={styles.finishButton} onClick={handleCancelPSE}>Sim, encerrar</button>
					</div>
				</Modal>

			</section>
		</>
	)
}

export {PSEEmAndamento};