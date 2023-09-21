import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AiFillLock } from "react-icons/ai";
import PSEFormHeader from "../../../components/PSEFormHeader";
import { PSEFormContext } from "../../../contexts/PSEFormContext";
import styles from "../../../styles/pseCadastro.module.scss";
import RadioInputPlusSelect from "../../../components/RadioInputPlusSelect";

export default function Page5() {
  const router = useRouter();

  return (
    <>
      <section className={styles.leftSide}>
        <PSEFormHeader page="5" showCircles={false} />

        <article>
          <h1>Muito obrigadx!</h1>
          <p>Em breve entraremos em contato com você.</p>

          <div className={styles.message}>
            <AiFillLock />
            <p>
              Levamos as questões de privacidade a sério. Você pode ter certeza
              de que seus dados pessoais estão protegidos com segurança.
            </p>
          </div>

          <div className={`${styles.leftForm} ${styles.centered}`}>
            
              <img src="/check_circle.svg" width={300} alt="logo do Ramo"/>

              <div className={styles.buttonsHolder}>
                <button
                  type="button"
                  className={styles.back_page2}
                  onClick={() => router.push("/PSE")}
                >
                  Voltar
                </button>
              </div>
            
          </div>
        </article>
      </section>

      <section className={styles.rightSide}>
        <article className={styles.rightForm_page2}></article>
      </section>
    </>
  );
}