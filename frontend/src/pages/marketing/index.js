import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import MarketingMenuRoutes from "../../components/MarketingMenuRoutes";
import MarketingNavBar from "../../components/MarketingNavBar";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "../../styles/marketing.module.scss";

export default function index() {
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
        return (
            <></>
        )
    } else {
		return (
			<div className={styles.all}>
				<Head>
					<title>Marketing - Inicio | IEEE CEFET-RJ</title>
				</Head>
	
				<MarketingNavBar page="home" />
	
				<div className={styles.pageContent}>
					<section className={styles.menuRoutes}>
						<MarketingMenuRoutes routesName={`Home`} routes={`/`}/>
					</section>
	
					<section className={styles.content}>
						<article>
							<h1>Bem Vindo, {"nome"}!</h1>
							
							<p>
								Aqui você encontrará ferramentas para personalizar
								certas partes do site do Ramo, como equipes, seus 
								prêmios e seus projetos.
							</p>
	
							<p>
								Além de poder controlar o sistema do PSE. 
							</p>
						</article>
					</section>
				</div>
			</div>
		);
	}

}
