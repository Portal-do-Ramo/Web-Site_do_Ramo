import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AiFillLock } from 'react-icons/ai';
import { PSEFormContext } from '../../../contexts/PSEFormContext';
import styles from '../../../styles/pseCadastroInteresse.module.scss';

export default function Page3({ crewsNames }) {
	const router = useRouter();

	const {
		crew,
		setCrew,
		area,
		setArea,
		motivation,
		setMotivation,
		experience,
		setExperience,
		handleSendCSV
	} = useContext(PSEFormContext);

	return (
		<section className={styles.pageContent}>
			<h1>Interesse</h1>
			<p>Insira seus interesses pessoais no Ramo Estudantil IEEE.</p>

			<article className={styles.formSection}>
				<div className={styles.leftSide}>
					<div className={styles.message}>
						<AiFillLock/>
						<p>
							Levamos as questões de privacidade a sério. Você pode ter
							certeza de que seus dados pessoais estão protegidos com 
							segurança.
						</p>
					</div>

					<div className={styles.mainForm}>
						<span>Equipe <strong>*</strong></span>
						<select required value={crew} onChange={(event) => setCrew(event.target.value)}>
						<option value="" disabled defaultValue={true} hidden>Selecione a equipe de interesse</option>
						
						{crewsNames.map((crewName, idx) => {
							return (
								<option key={idx} value={crewName}>{crewName}</option>
							)
						})}
						</select>

						<span>Área <strong>*</strong></span>
						<input 
							type='text' 
							placeholder='Digite a área de interesse' 
							value={area}
							onChange={(event) => setArea(event.target.value)}
						/>
					</div>
				</div>

				<div className={styles.rightSide}>
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
						<button type='button' className={styles.end} onClick={handleSendCSV}>Concluir</button>
					</div>
				</div>
			</article>
		</section>
	)
}