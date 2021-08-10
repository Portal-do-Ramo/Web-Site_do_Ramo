import NavBar from "../../components/NavBar/NavBar";
import styles from "../../styles/inicial.module.scss";

export default function inicial() {
  return (
    <div className={styles.all}>
      <NavBar />
      <div className={styles.container}>
        <h1>Seja bem-vindu, Admin</h1>
        <p>
          Aqui você pode personalizar algumas partes do site do ramo, vá fundo e
          explore.
        </p>
      </div>
    </div>
  );
}
