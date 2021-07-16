import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import styles from "../styles/sobre.module.scss";

export default function Sobre(){

    return (
        <>
            <Header/>

            <main className={styles.main}>
                <div className={styles.banner}></div>
                
                <div className={styles.about}>

                </div>
            </main>
            
            <Footer/>
        </>
    )
}