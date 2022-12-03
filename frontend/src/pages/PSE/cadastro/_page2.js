import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AiFillLock } from 'react-icons/ai';
import { IMaskInput } from "react-imask";
import PSEFormHeader from '../../../components/PSEFormHeader';
import { PSEFormContext } from '../../../contexts/PSEFormContext';
import styles from '../../../styles/pseCadastro.module.scss';

export default function Page2() {
  const router = useRouter();

  const {
    registration,
    setRegistration,
    course,
    setCourse,
    currentTimeCourse,
    setCurrentTimeCourse,
  } = useContext(PSEFormContext);

  const currentTimesCourse = [
    "1º período", 
    "2º período", 
    "3º período", 
    "4º período", 
    "5º período", 
    "6º período", 
    "7º período", 
    "8º período", 
    "9º período", 
    "10º período", 
    "Não sei definir", 
  ];

  const courses = [
    "Bacharelado em Administração", 
    "Bacharelado em Ciência da Computação", 
    "Bacharelado em Engenharia Ambiental", 
    "Bacharelado em Engenharia Civil",
    "Bacharelado em Engenharia de Controle e Automação",
    "Bacharelado em Engenharia de Produção",
    "Bacharelado em Engenharia de Telecomunicações",
    "Bacharelado em Engenharia Elétrica",
    "Bacharelado em Engenharia Eletrônica",
    "Bacharelado em Engenharia Mecânica",
    "Bacharelado em Física",
    "Bacharelado em Línguas Estrangeiras Aplicadas às Negociações Internacionais",
    "Curso Superior de Tecnologia em Gestão Ambiental",
    "Curso Superior de Tecnologia em Sistemas para Internet"
  ];

  return (
	<>
		<section className={styles.leftSide}>
			<PSEFormHeader page='2'/>
			
			<article>
				<h1>Dados da Matrícula</h1>
				<p>Insira seus dados acadêmicos.</p>

				<div className={styles.message}>
					<AiFillLock/>
					<p>
						Levamos as questões de privacidade a sério. Você pode ter
						certeza de que seus dados pessoais estão protegidos com 
						segurança.
					</p>
				</div>

				<div className={styles.leftForm}>
				<span>Matrícula <strong>*</strong></span>
					<input 
						type="text"
						placeholder='Digite o número da Matrícula'
						value={registration}
						onChange={(event) => setRegistration(event.target.value)}
					></input>

					<span>Curso <strong>*</strong></span>
					<select required value={course} onChange={(event) => setCourse(event.target.value)}>
						<option value="" disabled defaultValue={true} hidden>Selecione seu curso</option>
						
						{courses.map((course, idx) => {
							return (
								<option key={idx} value={course}>{course}</option>
							)
						})}
					</select>

					<span>Período atual <strong>*</strong></span>
					<select 
						required 
						value={currentTimeCourse} 
						onChange={(event) => setCurrentTimeCourse(event.target.value)}
					>
						<option value="" disabled defaultValue={true} hidden>Selecione seu período</option>
						
						{currentTimesCourse.map((currentTimeCourse, idx) => {
							return (
								<option key={idx} value={currentTimeCourse}>
									{currentTimeCourse}
								</option>
							)
						})}
					</select>

					<div className={styles.buttonsHolder}>
						<button
							type='button'
							className={styles.back_page2} 
							onClick={() => router.push("/PSE/cadastro?page=1")}
						>
							Voltar
						</button>
						
						<button 
							type='button'
							className={styles.next_page2}
							onClick={() => router.push("/PSE/cadastro?page=3")}
						>
							Próximo
						</button>
					</div>
				</div>
			</article>
		</section>

		<section className={styles.rightSide}>
			<article className={styles.rightForm_page2}>
				
			</article>
		</section>
	</>
  )
}