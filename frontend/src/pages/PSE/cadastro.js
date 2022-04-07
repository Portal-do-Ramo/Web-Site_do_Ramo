import styles from '../../styles/pseCadastro.module.scss';
import PSEFormHeader from '../../components/pseFormHeader';
import { AiFillLock } from 'react-icons/ai';

export default function cadastro() {
  return (
    <div className={styles.container}>
      <PSEFormHeader/>
      <div className={styles.pageContent}>
        <div className={styles.leftSide}>
          <h2>Registro</h2>
          <p>Insira suas informações pessoais</p>

          <div className={styles.message}>
            <AiFillLock/>
            <p>
              Levamos as questões de privacidade a sério. Você pode ter
              certeza de que seus dados pessoais estão protegidos com 
              segurança.
            </p>
          </div>

          <div className={styles.mainForm}>
            <span>Nome, Sobrenome e Localização</span>

          </div>
        </div>
        <div className={styles.rightSide}></div>
      </div>
    </div>
  )
}