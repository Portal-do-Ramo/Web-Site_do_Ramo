import { useRouter } from "next/router";
import { useContext } from "react";
import { PSEFormContext } from "../../contexts/PSEFormContext";
import styles from "./styles.module.scss";
import { ImCheckmark } from "react-icons/im";

export default function PSEFormHeader({ page, showCircles = true }) {
  const router = useRouter()

  const { 
    isFistPageValidated,
    isSecondPageValidated,
    isThirdPageValidated,
    isFourthPageValidated
  } = useContext(PSEFormContext);

  function dotStyle(pageStyle) {
    if (pageStyle === page) {
      return styles.activeDot;
    }

    if (isFistPageValidated && pageStyle === "1") {
      return styles.validatedDot;
    }
    
    if (isSecondPageValidated && pageStyle === "2") {
      return styles.validatedDot;
    }
    
    if (isThirdPageValidated && pageStyle === "3") {
      return styles.validatedDot;
    }

    if (isFourthPageValidated && pageStyle === "4") {
      return styles.validatedDot;
    }

    return styles.dots
  }

  return (
    <div className={styles.container}>
      <section>
        <img src="/Ramo_logo.svg" alt="logo do Ramo" onClick={() => router.push("/")}/>
      </section>

      {showCircles ? (
          <section className={styles.progressContainer}>
            <article 
              className={dotStyle("1")}
              onClick={() => router.push("/PSE/cadastro?page=1")}
            > {isFistPageValidated && <ImCheckmark/>} </article>
    
            <div className={styles.lines}></div>
    
            <article
              className={dotStyle("2")}
              onClick={() => router.push("/PSE/cadastro?page=2")}
            > {isSecondPageValidated && <ImCheckmark/>} </article>
            
            <div className={styles.lines}></div>
            
            <article
              className={dotStyle("3")}
              onClick={() => router.push("/PSE/cadastro?page=3")}
            > {isThirdPageValidated && <ImCheckmark />} </article>
            
            <div className={styles.lines}></div>
    
            <article
              className={dotStyle("4")}
              onClick={() => router.push("/PSE/cadastro?page=4")}
            > {isThirdPageValidated && <ImCheckmark/>} </article>
        </section> ): null
      }
    </div>
  );
}