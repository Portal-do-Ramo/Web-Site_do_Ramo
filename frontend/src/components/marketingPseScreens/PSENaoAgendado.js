import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { FiDownload } from "react-icons/fi";
import { AiFillEye } from "react-icons/ai";
import { MdOutlineFileDownloadOff } from "react-icons/md";

import styles from "../../pages/marketing/PSE/styles.module.scss";
import api from '../../services/api';



function PSENaoAgendado({isSpreadsheetAccessActive}) {
	const router = useRouter();
	const [beginDate, setBeginDate] = useState("");
	const [endDate, setEndDate] = useState("");

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

	async function handleSchedulePSE() {
		const date = new Date();

		let offset = date.getTimezoneOffset();

		offset = offset / 60;

		offset = "00" + offset;

		try {
			console.log(`${beginDate}-00:000-${offset.slice(-1)}:00`)
			await toast.promise(
				api.post("/pse/schedule",
				{ 
					startDate: `${beginDate}-00:000-${offset.slice(-1)}:00`,
					endDate: `${endDate}-00:000-${offset.slice(-1)}:00`
				}
				),
				{
					pending: 'Carregando',
					success: 'Novo PSE agendado',
					error: 'Não foi possível agendar um novo PSE'
				}
			)
		
			setTimeout(() => {
				router.reload();
			}, 2000);

		} catch (error) {
			return null;
		}
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
					
					<button type='button' onClick={handleSchedulePSE}>Agendar</button>
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