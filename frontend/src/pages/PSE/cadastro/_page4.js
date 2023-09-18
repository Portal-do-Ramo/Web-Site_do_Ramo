import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AiFillLock } from "react-icons/ai";
import PSEFormHeader from "../../../components/PSEFormHeader";
import { PSEFormContext } from "../../../contexts/PSEFormContext";
import styles from "../../../styles/pseCadastro.module.scss";
import RadioInputPlusSelect from "../../../components/RadioInputPlusSelect";

export default function Page4() {
  const router = useRouter();

  const {
    registration,
    setRegistration,
    course,
    setCourse,
    currentTimeCourse,
    setCurrentTimeCourse,
  } = useContext(PSEFormContext);

  const [val, setVal] = useState(""); //para testar RadioInputPlusSelect

  const currentTimesCourse = [
    "1º período",
    "2º período",
    "3º período",
    "4º período",
    "5º período",
    "6º período",
    "7º período",
    "8º período",
    "9º período",
    "10º período",
    "Não sei definir",
  ];

  const courses = [
    "Bacharelado em Administração",
    "Bacharelado em Ciência da Computação",
    "Bacharelado em Engenharia Ambiental",
    "Bacharelado em Engenharia Civil",
    "Bacharelado em Engenharia de Controle e Automação",
    "Bacharelado em Engenharia de Produção",
    "Bacharelado em Engenharia de Telecomunicações",
    "Bacharelado em Engenharia Elétrica",
    "Bacharelado em Engenharia Eletrônica",
    "Bacharelado em Engenharia Mecânica",
    "Bacharelado em Física",
    "Bacharelado em Línguas Estrangeiras Aplicadas às Negociações Internacionais",
    "Curso Superior de Tecnologia em Gestão Ambiental",
    "Curso Superior de Tecnologia em Sistemas para Internet",
  ];

  return (
    <>
      <section className={styles.leftSide}>
        <PSEFormHeader page="4" />

        <article>
          <h1>Censo</h1>
          <p>Insira outras informações pessoais.</p>

          <div className={styles.message}>
            <AiFillLock />
            <p>
              Levamos as questões de privacidade a sério. Você pode ter certeza
              de que seus dados pessoais estão protegidos com segurança.
            </p>
          </div>

          <div className={styles.leftForm}>
            <RadioInputPlusSelect
              label="PCD"
              defaultValue="Selecione uma opção"
              value={val}
              set={setVal}
              list={["Opção 1", "Opção 2", "Opção 3"]}
            />

            <div className={styles.buttonsHolder}>
              <button
                type="button"
                className={styles.back_page2}
                onClick={() => router.push("/PSE/cadastro?page=3")}
              >
                Voltar
              </button>

              <button
                type="button"
                className={styles.next_page2}
                /* onClick={() => router.push("/PSE/cadastro?page=3")} */
              >
                Finalizar
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
