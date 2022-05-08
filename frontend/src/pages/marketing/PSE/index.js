import NavBar from "../../../components/NavBar"
import styles from "../PSE/styles.module.scss"
import PSEEmAndamento from "./_PSEEmAndamento";
import PSEAgendado from "./_PSEAgendado";
import MarketingMenuRoutes from "../../../components/MarketingMenuRoutes";

export default function PSE(){
    return (
        <div className={styles.all}>
            <NavBar page="pse"/>
            

            <div className={styles.pageContent}>
                <div className={styles.content}>
                <MarketingMenuRoutes routesName={`PSE`} routes={`PSE`}/>
                    <PSEEmAndamento/>
                </div>
            </div>
        </div>
    )
}
