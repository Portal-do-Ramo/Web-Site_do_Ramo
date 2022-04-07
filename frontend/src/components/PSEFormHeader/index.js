import styles from "./styles.module.scss";

export default function PSEFormHeader() {
  return (
    <div className={styles.container}>
      <img src="/Ramo_logo.svg" alt="logo do Ramo"/>

      <section className={styles.progressContainer}>
        <article className="dots"></article>
        <article className="dots"></article>
        <article className="dots"></article>
      </section>
    </div>
  );
}