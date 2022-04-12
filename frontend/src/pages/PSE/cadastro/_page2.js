import { useRouter } from 'next/router';
import { AiFillLock } from 'react-icons/ai';
import { IMaskInput } from "react-imask";
import styles from '../../../styles/pseCadastroDados.module.scss';

export default function Page2() {
  const router = useRouter()

  return (
    <section className={styles.pageContent}>
      <h1>Dados da Matrícula</h1>
      <p>Insira seus dados acadêmicos</p>

      <div className={styles.message}>
        <AiFillLock/>
        <p>
          Levamos as questões de privacidade a sério. Você pode ter
          certeza de que seus dados pessoais estão protegidos com 
          segurança.
        </p>
      </div>

      <article className={styles.pageContent}>
        <div className={styles.leftSide}>
          <div className={styles.mainForm}>
            <span>Matrícula</span>
            <input type="text" placeholder='Número da Matrícula'></input>

            <span>Curso</span>
            <select required>
                <option value="" disabled selected hidden>Selecione seu curso</option>
                <option value="Bacharelado em Administração">Bacharelado em Administração</option>
                <option value="Bacharelado em Ciência da Computação">Bacharelado em Ciência da Computação</option>
                <option value="Bacharelado em Engenharia Ambiental">Bacharelado em Engenharia Ambiental</option>
                <option value="Bacharelado em Engenharia Civil">Bacharelado em Engenharia Civil</option>
                <option value="Bacharelado em Engenharia de Controle e Automação">
                    Bacharelado em Engenharia de Controle e Automação
                    </option>
                <option value="Bacharelado em Engenharia de Produção">Bacharelado em Engenharia de Produção</option>
                <option value="Bacharelado em Engenharia de Telecomunicações">
                    Bacharelado em Engenharia de Telecomunicações
                    </option>
                <option value="Bacharelado em Engenharia Elétrica">Bacharelado em Engenharia Elétrica</option>
                <option value="Bacharelado em Engenharia Eletrônica">Bacharelado em Engenharia Eletrônica</option>
                <option value="Bacharelado em Engenharia Mecânica">Bacharelado em Engenharia Mecânica</option>
                <option value="Bacharelado em Física">Bacharelado em Física</option>
                <option value="Bacharelado em Línguas Estrangeiras Aplicadas às Negociações Internacionais">
                    Bacharelado em Línguas Estrangeiras Aplicadas às Negociações Internacionais
                    </option>
                <option value="Curso Superior de Tecnologia em Gestão Ambiental">
                    Curso Superior de Tecnologia em Gestão Ambiental
                </option>
                <option value="Curso Superior de Tecnologia em Sistemas para Internet">
                    Curso Superior de Tecnologia em Sistemas para Internet
                </option>
            </select>

            <span>Período atual</span>
            <IMaskInput type='text' placeholder='1º período' mask={Number} min={1} max={12}/>
            
          </div>

          <div className={styles.buttonsHolder}>
            <button type='button' className={styles.back} onClick={() => router.push("/PSE/cadastro?page=1")}>Voltar</button>
            <button type='button' className={styles.prox} onClick={() => router.push("/PSE/cadastro?page=3")}>Próximo</button>
          </div>

        </div>
      </article>
    </section>
  )
}