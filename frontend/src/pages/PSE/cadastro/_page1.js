import { useRouter } from 'next/router';
import { AiFillLock } from 'react-icons/ai';
import { IMaskInput } from "react-imask";
import styles from '../../../styles/pseCadastro.module.scss';

export default function Page1() {
  const router = useRouter()

  return (
    <>
      <h1>Registro</h1>
      <p>Insira suas informações pessoais</p>

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
              <span>Nome, Sobrenome e Localização</span>
              <div className={styles.nameInputs}>
                <input type="text" placeholder='Nome'></input>
                <input type="text" placeholder='Sobrenome'></input>
              </div>
              
              <div className={styles.loc}>
                <input type="text" placeholder='Localização'></input>
              </div>

            <span>Celular</span>
            <IMaskInput mask="(00) 00000-0000" name='phoneNumber' placeholder='(21) 9xxxx-xxxx'/>
            
            <span>E-mail</span>
            <input type="email" placeholder='nome@email.com'></input>
            
          </div>
        </div>

        <div className={styles.rightSide}>
          <span>Redes Sociais</span>
          <input type="text" placeholder='Facebook'></input>
          <input type="text" placeholder='Linkedin'></input>
          <input type="text" placeholder='Instagram'></input>
          <div className={styles.buttonsHolder}>
            <button type='button' className={styles.cancel} onClick={() => router.push("/PSE")}>Cancelar</button>
            <button type='button' className={styles.prox} onClick={() => router.push("/PSE/cadastro?page=2")}>Próximo</button>
          </div>
        </div>
      </article>
    </>
  )
}