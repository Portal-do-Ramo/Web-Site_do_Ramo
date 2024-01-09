import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AiFillLock } from "react-icons/ai";
import PSEFormHeader from "../../../components/PSEFormHeader";
import { PSEFormContext } from "../../../contexts/PSEFormContext";
import styles from "../../../styles/pseCadastro.module.scss";
import RadioInputPlusSelect from "../../../components/RadioInputPlusSelect";
import { toast } from "react-toastify";

export default function Page5() {
  const router = useRouter();
  // const {
  //   isFistPageValidated,
  //   isSecondPageValidated,
  //   isThirdPageValidated,
  //   isFourthPageValidated,

  // } = useContext(PSEFormContext);

  // const [shouldRender, setShouldRender] = useState(false);

  // useEffect(() => {
  //   if (isFistPageValidated && isSecondPageValidated && isThirdPageValidated && isFourthPageValidated) {
  //     setShouldRender(true);
  //   } else {
  //     toast.error("Algumas páginas não foram validadas com sucesso.");
  //     router.push('/');
  //   }
  // }, [isFistPageValidated, isSecondPageValidated, isThirdPageValidated, isFourthPageValidated]);

  return  (
    <>
      <section className={styles.leftSide}>
        <PSEFormHeader page="5" showCircles={false} />

        <article>
          <h1>Muito obrigadx!</h1>
          <p>Em breve entraremos em contato com você.</p>



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
  )
}
