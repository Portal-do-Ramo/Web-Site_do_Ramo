import MarketingMenuRoutes from "../../components/MarketingMenuRoutes";
import MarketingNavBar from "../../components/MarketingNavBar";
import styles from "../../styles/marketing.module.scss";

export default function inicial() {
  return (
    <div className={styles.all}>
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
