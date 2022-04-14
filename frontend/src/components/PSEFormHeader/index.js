import styles from "./styles.module.scss";

export default function PSEFormHeader({ page }) {
  return (
    <div className={styles.container}>
      <section>
        <img src="/Ramo_logo.svg" alt="logo do Ramo"/>
      </section>

      <section className={styles.progressContainer}>
        <article className={page === "1" ? styles.activeDot : styles.dots}></article>
        <div className={styles.lines}></div>
        <article className={page === "2" ? styles.activeDot : styles.dots}></article>
        <div className={styles.lines}></div>
        <article className={page === "3" ? styles.activeDot : styles.dots}></article>
      </section>
    </div>
  );
}