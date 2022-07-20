import MarketingNavBar from "../../../components/MarketingNavBar";
import styles from "../PSE/styles.module.scss";
import PSEEmAndamento from "./_PSEEmAndamento";
import PSEAgendado from "./_PSEAgendado";
import PSENaoAgendado from "./_PSENaoAgendado";
import MarketingMenuRoutes from "../../../components/MarketingMenuRoutes";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../../contexts/AuthContext";

let psecontroler = 2;

function controller(x) {
    x = 1;

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
    const router = useRouter();

	const { user, isAuthenticated } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
		if (isAuthenticated) {
            if (user === null) {
                router.push("/login");
            } else {
				setIsLoading(false);
			}
        }
    }, [user, isAuthenticated]);

	if (isLoading) {
        return ( <></> )
    } else {
        return (
            <div className={styles.all}>
                <Head>
                    <title>Marketing - PSE | IEEE CEFET-RJ</title>
                </Head>
    
                <MarketingNavBar page="pse"/>
                
                <div className={styles.pageContent}>
                    <div className={styles.content}>
                        <MarketingMenuRoutes routesName={`PSE`} routes={`PSE`}/>
                        {controller(psecontroler)}
                    </div>
                </div>
            </div>
        )
    }
}
