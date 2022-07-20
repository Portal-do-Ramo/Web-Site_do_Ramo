import MarketingNavBar from "../../../components/MarketingNavBar"
import MarketingMenuRoutes from "../../../components/MarketingMenuRoutes";
import Link from "next/link";
import styles from "../../../styles/marketingEquipes.module.scss"
import api from '../../../services/api'

import { BiPlusMedical } from 'react-icons/bi';
import { BsFillGearFill } from 'react-icons/bs';
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../../contexts/AuthContext";

export default function equipes({ crews }){
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
			  <title>Marketing - Equipes | IEEE CEFET-RJ</title>
			</Head>
	  
			<MarketingNavBar page="equipes"/>
	  
			<div className={styles.pageContent}>
				<div className={styles.content}>
					<MarketingMenuRoutes routesName={`Equipes`} routes={`equipes`}/>
					<div className={styles.row}>
						<div className={styles.text}>
							<h1>Lista de Equipes</h1>
							<p>{crews.length} Equipes</p>
						</div>
						<Link href={"/marketing/equipes/criar"}>
						  <span className={styles.link}>
							<BiPlusMedical/>
							Criar Equipe
						  </span>
						</Link>
					</div>
	  
					<div className={styles.crewsList}>
						  {crews.map((crew) => { 
							return(
							  <div className={styles.crewRow} key={crew.id}>
								<div className={styles.name}>
								  <img src={crew.image}/>
								  <h2>{crew.name}</h2>
								</div>
								<Link href={`/marketing/equipes/${crew.id}`}>
								  <span className={styles.gearConfig}><BsFillGearFill/></span>
								</Link>
							  </div>
							)
						  })}
					</div>
				</div>
			</div>
		  </div>
		)
	}
}

export const getServerSideProps = async () => {
  let {data : crews} = await api.get("/crews");

  return {
    props: {
      crews
    }
  }
}