import NavBar from "../../../components/NavBar"
import styles from "../PSE/styles.module.scss"
import PSEEmAndamento from "./_PSEEmAndamento";
import PSEAgendado from "./_PSEAgendado";
import PSENaoAgendado from "./_PSENaoAgendado";
import MarketingMenuRoutes from "../../../components/MarketingMenuRoutes";

let psecontroler = 2;

function controller(x) {
    //psecontroler = 0 --> <PSENaoAgendado/>
    //psecontroler = 1 --> <PSEAgendado/>
    //psecontroler = 2 --> <PSEEmAndamento/>
    x = 2;

    switch (x) {
        case 0:
            return <PSENaoAgendado/>

            break;
        case 1:
            return <PSEAgendado/>

            break;
        case 2:
            return <PSEEmAndamento/>

            break;
        default:
            return <PSENaoAgendado/>
            
            break;
    }
}

export default function PSE(){
    return (
        <div className={styles.all}>
            <NavBar page="pse"/>
            
            <div className={styles.pageContent}>
                <div className={styles.content}>
                    <MarketingMenuRoutes routesName={`PSE`} routes={`PSE`}/>
                    {controller(psecontroler)}
                </div>
            </div>
        </div>
    )
}
