import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AiFillLock } from 'react-icons/ai';
import { IMaskInput } from "react-imask";
import { PSEFormContext } from '../../../contexts/PSEFormContext';
import styles from '../../../styles/pseCadastroDados.module.scss';

export default function Page2() {
  const router = useRouter();

  const {
    Registration,
    setRegistration,
    course,
    setCourse,
    currentTimeCourse,
    setCurrentTimeCourse,
  } = useContext(PSEFormContext);

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
    <section className={styles.pageContent}>
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

      <article className={styles.formSection}>
        <div className={styles.leftSide}>
          <div className={styles.mainForm}>
            <span>Matrícula <strong>*</strong></span>
            <input 
              type="text"
              placeholder='Número da Matrícula'
              value={Registration}
              onChange={(event) => setRegistration(event.target.value)}
            ></input>

            <span>Curso <strong>*</strong></span>
            <select required value={course} onChange={(event) => setCourse(event.target.value)}>
              <option value="" disabled selected hidden>Selecione seu curso</option>
              
              {courses.map((course, idx) => {
                return (
                  <option key={idx} value={course}>{course}</option>
                )
              })}
            </select>

            <span>Período atual <strong>*</strong></span>
            <IMaskInput 
              type='text' 
              placeholder='1º período' 
              mask={Number} 
              min={1} 
              max={12}
              value={currentTimeCourse}
              onChange={(event) => setCurrentTimeCourse(event.target.value)}
            />
            
          </div>

          <div className={styles.buttonsHolder}>
            <button type='button' className={styles.back} onClick={() => router.push("/PSE/cadastro?page=1")}>Voltar</button>
            <button type='button' className={styles.prox} onClick={() => router.push("/PSE/cadastro?page=3")}>Próximo</button>
          </div>

        </div>
      </article>
      
      <div className={styles.rightSide}>
      </div>
    </section>
  )
}