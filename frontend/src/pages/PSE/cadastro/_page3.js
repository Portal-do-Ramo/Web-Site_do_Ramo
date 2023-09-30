import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { AiFillLock } from 'react-icons/ai';
import PSEFormHeader from '../../../components/PSEFormHeader';
import { PSEFormContext } from '../../../contexts/PSEFormContext';
import styles from '../../../styles/pseCadastro.module.scss';
import BasicSelect from '../../../components/BasicSelect';

export default function Page3({ crewsNames }) {
	const router = useRouter();

  const [equipes, setEquipes] = useState('');
  const [subAreas, setSubAreas] = useState('');


  const equipesAtivas = [
    'byte',
    'rocket',
		'power',
		'botz',
		'wie',
		'socialwolf',
		'marketing',
		'assessoria de gestão'
  ]
  const areaDasEquipes = {
    'byte': ['programação', 'arte e som', 'eletrônica','mecânica'],
    'rocket': ['propulsão', 'aerodinâmica', 'recuperação', 'estruturas', 'eletrônica'],
		'power': ['eletrônica/programação', 'mecânica', 'divulgação'],
		'botz': ['programação','mecânica', 'eletrônica'],
		'wie': ['produtos','mídias sociais', 'eventos', 'projetos'],
		'socialwolf':['educacional','mecânica','programação','eletrônica'],
  }


	const dynamicDates = [
		"03/04/2023 às 15:30h - Segunda-feira",
		"04/04/2023 às 09h - Terça-feira",
		"04/04/2023 às 14:30h - Terça-feira",
		"06/04/2023 às 10:30h - Quinta-feira",
	]

	const {
		crew,
		setCrew,
		area,
		setArea,
		availableDate,
		setAvailableDate,
		reason,
		setReason,
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
            
          <BasicSelect
              label={'Equipe'}
              required={true}
              value={equipes}
              set={setEquipes}
              defaultValue={'Selecione a equipe'}
              list={equipesAtivas}
          />

            <BasicSelect
              label={'Área'}
              required={true}
              value={subAreas}
              set={setSubAreas}
              defaultValue={'Selecione a area'}
              list={areaDasEquipes[equipes] ? areaDasEquipes[equipes] : [] }
            />


						{/* {crewsNames && crewsNames.length > 0 && (
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
						)} */}

						{/* <span>Área <strong>*</strong></span>

						<input 
							type='text' 
							placeholder='Digite a área de interesse' 
							value={area}
							onChange={(event) => setArea(event.target.value)}
						/> */}

						{dynamicDates && dynamicDates.length > 0 && (
							<>
								<span>Data de preferência da dinâmica <strong>*</strong></span>
								<select required value={availableDate} onChange={(event) => setDynamicMainDate(event.target.value)}>
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
								<select required value={availableDate} onChange={(event) => setDynamicSecondaryDate(event.target.value)}>
									<option value="" disabled defaultValue={true} hidden>Selecione a sua segunda data de preferência para a dinâmica</option>
								
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
						value={reason}
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