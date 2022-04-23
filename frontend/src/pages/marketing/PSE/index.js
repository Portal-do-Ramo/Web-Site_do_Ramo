import NavBar from "../../../components/NavBar"
import styles from "../PSE/styles.module.scss"
import PSEEmAndamento from "./_PSEEmAndamento";
import PSEAgendado from "./_PSEAgendado";

export default function PSE(){
    return (
        <div className={styles.all}>
            <NavBar page="pse"/>
            

            <div className={styles.pageContent}>
                <div className={styles.content}>
                    <PSEEmAndamento/>
                </div>
            </div>
        </div>
    )
}
