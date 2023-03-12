import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AiFillLock } from 'react-icons/ai';
import PSEFormHeader from '../../../components/PSEFormHeader';
import { PSEFormContext } from '../../../contexts/PSEFormContext';
import styles from '../../../styles/pseCadastro.module.scss';

export default function Page3({ crewsNames }) {
	const router = useRouter();

	const dynamicDates = [
		"07/04/2023 às 15h - Sábado"
	]

	const {
		crew,
		setCrew,
		area,
		setArea,
		dynamicMainDate,
		setDynamicMainDate,
		dynamicSecondaryDate,
		setDynamicSecondaryDate,
		motivation,
		setMotivation,
		experience,
		setExperience,
		handleSendCSV
	} = useContext(PSEFormContext);

	return (
		<>
			<section className={styles.leftSide}>
				<PSEFormHeader page='3'/>
				
				<article>
					<h1>Interesse</h1>
					<p>Insira seus interesses pessoais no Ramo Estudantil IEEE.</p>

					<div className={styles.message}>
						<AiFillLock/>
						<p>
							Levamos as questões de privacidade a sério. Você pode ter
							certeza de que seus dados pessoais estão protegidos com 
							segurança.
						</p>
					</div>

					<div className={styles.leftForm}>
						{crewsNames && crewsNames.length > 0 && (
							<>
								<span>Equipe <strong>*</strong></span>
								<select required value={crew} onChange={(event) => setCrew(event.target.value)}>
									<option value="" disabled defaultValue={true} hidden>Selecione a equipe de interesse</option>
								
									{crewsNames.map((crewName, idx) => {
										return (
											<option key={idx} value={crewName}>{crewName}</option>
										)
									})}
								</select>
							</>
						)}

						<span>Área <strong>*</strong></span>

						<input 
							type='text' 
							placeholder='Digite a área de interesse' 
							value={area}
							onChange={(event) => setArea(event.target.value)}
						/>

						{dynamicDates && dynamicDates.length > 0 && (
							<>
								<span>Data de preferência da dinâmica <strong>*</strong></span>
								<select required value={dynamicMainDate} onChange={(event) => setDynamicMainDate(event.target.value)}>
									<option value="" disabled defaultValue={true} hidden>Selecione a sua data de preferência para a dinâmica</option>
								
									{dynamicDates.map((dynamicDate, idx) => {
										return (
											<option key={idx} value={dynamicDate}>{dynamicDate}</option>
										)
									})}
								</select>
							</>
						)}

						{dynamicDates && dynamicDates.length > 0 && (
							<>
								<span>Data de preferência secundária da dinâmica <strong>*</strong></span>
								<select required value={dynamicSecondaryDate} onChange={(event) => setDynamicSecondaryDate(event.target.value)}>
									<option value="" disabled defaultValue={true} hidden>Selecione a sua data de preferência secundária para a dinâmica</option>
								
									{dynamicDates.map((dynamicDate, idx) => {
										return (
											<option key={idx} value={dynamicDate}>{dynamicDate}</option>
										)
									})}
								</select>
							</>
						)}
					</div>
				</article>
			</section>

			<section className={styles.rightSide}>
				<article className={styles.rightForm}>
				<span>Por quais motivos gostaria de fazer parte do Ramo?</span>
					<textarea 
						placeholder="Escreva seus motivos"
						onChange={event => setMotivation(event.target.value)}
						value={motivation}
					/>

					<span>Você teve alguma experiência que pode agregar positivamente na sua trajetória dentro do ramo?</span>
					<textarea 
						placeholder="Escreva suas experiências"
						onChange={event => setExperience(event.target.value)}
						value={experience}
					/>

					<div className={styles.buttonsHolder}>
						<button type='button' className={styles.back} onClick={() => router.push("/PSE/cadastro?page=2")}>voltar</button>
						<button type='button' className={styles.finish} onClick={handleSendCSV}>Concluir</button>
					</div>
				</article>
			</section>
		</>
	)
}