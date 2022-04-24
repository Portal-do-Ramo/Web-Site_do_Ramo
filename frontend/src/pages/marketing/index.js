import NavBar from "../../components/NavBar";
import styles from "../../styles/marketing.module.scss";

export default function inicial() {
  return (
    <div className={styles.all}>
      <NavBar page="home" />
      <div className={styles.container}>
        <section>
          <h1>Seja bem-vindo, Admin</h1>
          <p>
            Aqui você pode personalizar algumas partes do site do ramo, 
            vá fundo e explore.
          </p>
        </section>
      </div>
    </div>
  );
}
