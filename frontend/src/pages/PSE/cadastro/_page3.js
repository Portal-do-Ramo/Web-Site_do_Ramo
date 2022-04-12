import { useRouter } from 'next/router';
import { AiFillLock } from 'react-icons/ai';
import { IMaskInput } from "react-imask";
import styles from '../../../styles/pseCadastroInteresse.module.scss';

export default function Page3() {
  const router = useRouter()

  return (
    <section className={styles.pageContent}>
      <h1>Interesse</h1>
      <p>
          Insira seus interesses pessoais 
          no Ramo Estudantil IEEE.
      </p>

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
            <span>Equipe</span>
            <select required>
                <option value="" disabled selected hidden>Selecione a equipe de interesse</option>
                <option value="Default">Selecione a equipe de interesse</option>
                <option value="WolfByte">WolfByte</option>
                <option value="WolfBots">WolfBots</option>
                <option value="WolfPower">WolfPower</option>
                <option value="Wie">Wie</option>
                <option value="Marketing">Marketing</option>
                <option value="RocketWolf">RocketWolf</option>
                <option value="SocialWolf">SocialWolf</option>
                <option value="Gestão">Gestão</option>
            </select>

            <span>Período atual</span>
            <IMaskInput type='text' placeholder='1º período' mask={Number} min={1} max={12}/>
          </div>

        </div>

        <div className={styles.rightSide}>
          <span>Por quais motivos gostaria de fazer parte do Ramo?</span>
          <input type="text" placeholder='Escreva seus motivos...'></input>

          <span>
              Você teve alguma experiência que pode agregar 
              positivamente na sua trajetória dentro do ramo?
          </span>
          <input type="text" placeholder='Escreva seus motivos'></input>

          <div className={styles.buttonsHolder}>
            <button type='button' className={styles.back} onClick={() => router.push("/PSE/cadastro?page=2")}>Voltar</button>
            <button type='button' className={styles.prox} onClick={() => router.push("")}>Próximo</button>
          </div>
        </div>
      </article>
    </section>
  )
}