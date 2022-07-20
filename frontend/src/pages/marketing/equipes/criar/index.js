import { useContext, useEffect, useState } from "react";
import MarketingMenuRoutes from "../../../../components/marketingMenuRoutes"
import MarketingNavBar from "../../../../components/MarketingNavBar"
import { AuthContext } from "../../../../contexts/AuthContext";
import styles from "../criar/styles.module.scss"

export default function Criar({ crews }) {
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
            <MarketingNavBar page="equipes"/>

                <div className={styles.pageContent}>
                    <div className={styles.content}>
                        <MarketingMenuRoutes routesName={`Equipes/Criar`} routes={`equipes/criar`}/>
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

                        <div className={styles.buttonRow}>
                            <button className={styles.cancel}>Cancelar</button>
                            <button className={styles.edit}>Criar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
