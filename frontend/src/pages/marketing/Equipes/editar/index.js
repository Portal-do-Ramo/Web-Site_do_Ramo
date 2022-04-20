import NavBar from "../../../../components/NavBar"
import styles from "../../../../styles/marketingEquipes.module.scss"

export default function Manage({ crews }){
  return (
    <div className={styles.all}>
      <NavBar/>

      <div className={styles.pageContent}>
        <h1>Criar Equipe</h1>

        <div className={styles.logoName}>
          <div className={styles.logoHolder}>
            <h1>Logo da equipe</h1>
            
          </div>

          <div className={styles.nameHolder}>
            <h1>Nome da equipe</h1>
            <input type="text" placeholder='Nome'></input>

          </div>
        </div>
          
      </div>
    </div>
  )
}
