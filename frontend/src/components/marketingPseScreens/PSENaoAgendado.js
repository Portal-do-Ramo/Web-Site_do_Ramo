import { useEffect, useState } from "react";
import { useRouter } from "next/router";


import { FiDownload } from "react-icons/fi";
import { AiFillEye } from "react-icons/ai";
import { MdOutlineFileDownloadOff } from "react-icons/md";

import styles from "../../pages/marketing/PSE/styles.module.scss";
import api from '../../services/api';
import Agendamento from "./modal-agendamento/modal-agendamento";
import Modal from 'react-modal';

function PSENaoAgendado({isSpreadsheetAccessActive}) {
	const router = useRouter();
	const [beginDate, setBeginDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [editPSEModalIsOpen, setEditPSEModalIsOpen] = useState(false);
	useEffect(() => {
		let date = new Date();
		date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
		setBeginDate(date.toISOString().slice(0, 16));
		setEndDate(date.toISOString().slice(0, 16));
	}, []);

	function handleAccessPSEFile() {
    const link = process.env.NEXT_PUBLIC_PSE_SPREADSHEET_LINK;
    
    if (link) { 
        window.open(link, '_blank');
    } else {
        console.error('PSE_SPREADSHEET_LINK is not defined.');
    }
	}

	function openEditPSEModal() {
		setEditPSEModalIsOpen(true);
	}

	function closeEditPSEModal() {
		setEditPSEModalIsOpen(false);
	}


	return (
		<>
			<section className={styles.showInformation}>
				<img src="/pseilustration.svg"></img>
				<div className={styles.container}>
					<span>Não há registro de processo seletivo ativo</span>
					<p>Registre um novo PSE para habilitar outras funções</p>
				</div>           
			</section>

			<section className={styles.schedulePSESection}>
				<span>Cadastre um novo PSE!</span>
				<div className={styles.rowDates}>
					<section className={styles.datesContainer}>
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
					</section>
					
					<button type='button' onClick={openEditPSEModal}>Agendar</button>
					<Modal 
						isOpen={editPSEModalIsOpen}
						onRequestClose={closeEditPSEModal}
						className={styles.modal}
						overlayClassName={styles.overlay}
						contentLabel="Example Modal"
					>
						
						<Agendamento beginDate={beginDate} endDate={endDate}/>
					</Modal>
				</div>
			</section>

			<section className={styles.accessPSEFile}>
				<span>Visualizar inscritos:</span>
				<button 
					type="button" 
					// className={!isSpreadsheetAccessActive ? styles.downloadButtonOff : ""} 
					className={isSpreadsheetAccessActive} 
					onClick={handleAccessPSEFile}
					// disabled={!isDownloadActive}
					
				>
					{/* {isDownloadActive ? <FiDownload/> : <MdOutlineFileDownloadOff/> } */}
					<span>Acessar planilha de inscritos</span> <AiFillEye />  
				</button>
			</section>
		</>
	)
}

export {PSENaoAgendado};