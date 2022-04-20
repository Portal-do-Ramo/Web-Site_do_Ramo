import NavBar from "../../../../components/NavBar"
import styles from "../criar/styles.module.scss"

import { BsCamera } from 'react-icons/bs'

export default function Criar({ crews }){
  return (
    <div className={styles.all}>
      <NavBar/>

        <div className={styles.pageContent}>
            <div className={styles.content}>
                <h1>Criar Equipe</h1>

                <div className={styles.logoName}>
                    <div className={styles.logoHolder}>
                        <h1>Logo da equipe</h1>
                        <input type="image" alt=""></input>
                        
                    </div>

                    <div className={styles.nameHolder}>
                        <h1>Nome da equipe</h1>
                        <input type="text" placeholder='Digite o nome da equipe'></input>

                    </div>
                </div>

                <div className={styles.description}>
                    <h1>Descrição da equipe</h1>
                    <textarea placeholder='Digite a descrição da equipe'></textarea>

                </div>
            </div>
        </div>
    </div>
  )
}
