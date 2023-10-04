import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { AiFillLock } from 'react-icons/ai';
import PSEFormHeader from '../../../components/PSEFormHeader';
import { PSEFormContext } from '../../../contexts/PSEFormContext';
import styles from '../../../styles/pseCadastro.module.scss';
import BasicSelect from '../../../components/BasicSelect';

export default function Page3({ crewsNames }) {
	const router = useRouter();

	const [dynamicMainDates, setDynamicMainDates] = useState([]);
	const handleCheckboxChange = (event, date) => {
  const checkedDates = dynamicMainDates.includes(date)
    ? dynamicMainDates.filter((d) => d !== date)
    : [...dynamicMainDates, date];

  setDynamicMainDates(checkedDates);
  };
  

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
    'socialwolf': ['educacional', 'mecânica', 'programação', 'eletrônica'],
    'marketing':['marketing'],
		'assessoria de gestão':['assessoria de gestão']
  }


	const dynamicDates = [
		"01/10/2023 - 15:30h (Domingo)",
		"02/10/2023 - 9:00h (Segunda-feira)",
		"04/10/2023 - 14:30h (Quarta-feira)",
		"06/10/2023 - 10:30h (Sexta-feira)",
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

  const [hideFieldArea, setHideFieldArea] = useState(true) 
  const [previousCrew, setPreviewCrew] = useState("")

  useEffect(() => {

    if (crew === '' || crew === "marketing" || crew === "assessoria de gestão") {
      
      setHideFieldArea(true)
      setArea(areaDasEquipes[crew] ? areaDasEquipes[crew][0] : "")
      
    } else if (previousCrew === '') { 

      setHideFieldArea(false)

    } else if (previousCrew !== '') {

      setHideFieldArea(false)
      setArea('')

    }

    setPreviewCrew(crew)

  }, [crew])


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
              value={crew}
              set={setCrew}
              defaultValue={'Selecione a equipe'}
              list={equipesAtivas}
          />
            {!hideFieldArea &&
              <BasicSelect
                  label={'Área'}
                  required={true}
                  value={area}
                  set={setArea}
                  defaultValue={'Selecione a area'}
                  list={areaDasEquipes[crew] ? areaDasEquipes[crew] : [] }
                />     
            }


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
							<div className={styles.dynamicDate}>
								{dynamicDates.map((dynamicDate, idx) => (
									<div className={styles.dynamicDateItem} key={idx}>
										<label htmlFor={`dynamicMainDate-${idx}`}>
											{dynamicDate}
										</label>
										<input
											type="checkbox"
											id={`dynamicMainDate-${idx}`}
											value={dynamicDate}
											checked={dynamicMainDates.includes(dynamicDate)}
											onChange={(event) => handleCheckboxChange(event, dynamicDate)}
										/>
									</div>
								))}
							</div>

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
						<button type='button' className={styles.cancel} onClick={() => router.push("/PSE/cadastro?page=2")}>Voltar</button>
						<button type='button' className={styles.next} onClick={() => router.push("/PSE/cadastro?page=4")}>Próximo</button>
					</div>
				</article>
			</section>
		</>
	)
}