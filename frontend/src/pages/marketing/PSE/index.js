import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isBefore } from "date-fns";
import Head from "next/head";

import styles from "./styles.module.scss";
import api from "../../../services/api";

import MarketingNavBar from "../../../components/MarketingNavBar";
import MarketingMenuRoutes from "../../../components/MarketingMenuRoutes";

import { AuthContext } from "../../../contexts/AuthContext";
import { PSEAgendado } from "../../../components/marketingPseScreens/PSEAgendado";
import { PSEEmAndamento } from "../../../components/marketingPseScreens/PSEEmAndamento";
import { PSENaoAgendado } from "../../../components/marketingPseScreens/PSENaoAgendado";

export default function PSE({ startDate, endDate, page, isSpreadsheetAccessActive }) {
    const router = useRouter();

	const { user, isAuthenticated } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
		if (isAuthenticated) {
            if (user === null) {
                router.push("/login");
            } else if(!user.isAdmin){
                router.push("/marketing");
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

                        {page === "0" && <PSENaoAgendado isSpreadsheetAccessActive={isSpreadsheetAccessActive}/>}
                        {page === "1" && <PSEAgendado start={startDate} end={endDate} styles/>}
                        {page === "2" && <PSEEmAndamento start={startDate} end={endDate} isSpreadsheetAccessActive={isSpreadsheetAccessActive} styles/>}
                    </div>
                </div>
            </div>
        )
    }
}

export const getServerSideProps = async () => {
    let startDate = null;
    let endDate = null;
    let page = "0";
	let isSpreadsheetAccessActive = true;
    
    try {
        const {data} = await api.get("/pse");
        
        startDate = data.start;
        endDate = data.end;

        if (!isBefore(new Date(startDate), new Date())) {
            page = "1";
            isSpreadsheetAccessActive = false;
        } else {
            page = "2";
            isSpreadsheetAccessActive = false;
        }
    } catch (error) {
        startDate = null;
        endDate = null;
    }
  
    return {
      props: {
        isSpreadsheetAccessActive,
        startDate,
        endDate,
        page
      }
    }
}
