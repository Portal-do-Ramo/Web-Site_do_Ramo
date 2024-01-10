import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

import { BiPlusMedical } from 'react-icons/bi';
import { BsFillGearFill } from 'react-icons/bs';

import styles from "../../../styles/marketingEquipes.module.scss"
import api from '../../../services/api'

import MarketingNavBar from "../../../components/MarketingNavBar"
import MarketingMenuRoutes from "../../../components/MarketingMenuRoutes";

import { AuthContext } from "../../../contexts/AuthContext";

export default function equipes({ crews }){
	const router = useRouter();

		const { user, isAuthenticated } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
		const [userCrews, setUserCrews] = useState([]);

    useEffect(() => {
				if (isAuthenticated) {
            if (user === null) {
                router.push("/login");
            } else {
								if(user.isAdmin){
									setUserCrews(crews)
								}
								else{
									const userSpecificCrews = crews.filter(crew => crew.id === user.crewId)
									setUserCrews(userSpecificCrews);
								}
								setIsLoading(false);
						}
        }
    }, [user, isAuthenticated, crews]);


	if (isLoading) {
        return ( <></> )
    } else {
		return (
		  <div className={styles.all}>
			<Head>
			  <title>Marketing - Equipes | IEEE CEFET-RJ</title>
			</Head>
	  
			<MarketingNavBar page="equipes" user={user ? user : null} />
	  
			<div className={styles.pageContent}>
				<div className={styles.content}>
					<MarketingMenuRoutes routesName={`Equipes`} routes={`equipes`}/>
					<div className={styles.row}>
						<div className={styles.text}>
							<h1>Lista de Equipes</h1>
							<p>{userCrews.length} Equipes</p>
						</div>
						
						{user && user.isAdmin ? (
									<Link href={"/marketing/equipes/criar"}>
										<span className={styles.link}>
										<BiPlusMedical/>
										Criar Equipe
										</span>
									</Link>
								) : null}

					</div>
	  
					<div className={styles.crewsList}>
						  {userCrews.map((crew) => { 
										return(
											<div className={styles.crewRow} key={crew.id}>
											<div className={styles.name}>
												<img src={crew.imageURL}/>
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