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
import api from "../../../services/api";
import { isBefore } from "date-fns";

function controller(page, startDate, endDate) {
    page = 0;

    switch (page) {
        case 1:
            return <PSEAgendado start={startDate} end={endDate}/>
        case 2:
            return <PSEEmAndamento start={startDate} end={endDate}/>
        default:
            return <PSENaoAgendado/>
    }
}

export default function PSE({ startDate, endDate, page }) {
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
    
                <MarketingNavBar page="pse" user={user ? user : null} />
                
                <div className={styles.pageContent}>
                    <div className={styles.content}>
                        <MarketingMenuRoutes routesName={`PSE`} routes={`PSE`}/>
                        {controller(page, startDate, endDate)}
                    </div>
                </div>
            </div>
        )
    }
}

export const getServerSideProps = async (ctx) => {
    let startDate = null;
    let endDate = null;
    let page = 0;

    try {
        const {data} = await api.get("/pse");
        
        startDate = data.start;
        endDate = data.end;

        if (!isBefore(new Date(startDate), new Date())) {
            page = 1;
        } else {
            page = 2;
        }

    } catch (error) {
        startDate = null;
        endDate = null;
    }
  
    return {
      props: {
        startDate,
        endDate,
        page
      }
    }
}
