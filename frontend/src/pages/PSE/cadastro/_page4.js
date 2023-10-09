import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AiFillLock } from "react-icons/ai";
import PSEFormHeader from "../../../components/PSEFormHeader";
import { PSEFormContext } from "../../../contexts/PSEFormContext";
import styles from "../../../styles/pseCadastro.module.scss";
import RadioInputPlusSelect from "../../../components/RadioInputPlusSelect";
import BasicSelect from '../../../components/BasicSelect';

export default function Page4() {
  const router = useRouter();

  const {
    pcd,
    setPcd,
    neuroatypicality,
    setNeuroatypicality,
    selfDeclaration,
    setSelfDeclaration,
    gender,
    setGender,
    handleSendCSV

  } = useContext(PSEFormContext);


  const pcdList = [
    "Deficiência Motora",
    "Deficiência Auditiva",
    "Deficiência Intelectual",
    "Deficiência Múltipla",
    "Não sei",
    "Prefiro não dizer"
  ]
  const neuroList = [
    "Transtorno do Déficit de atenção com hiperatividade(TDAH)",
    "Transtorno do Déficit de Atenção",
    "Transtorno do Espectro Autirsta(TEA)",
    "Dislexia",
    "Outro"
  ]
  const selfDeclareList =[
    "Pessoa Branca",
    "Pessoa Amarela",
    "Pessoa Preta",
    "Pessoa Indígena",
    "Pessoa Parda",
    "Não sei",
    "Prefiro não dizer"
  ]


  const handleOptionChange = (event) => {
    setGender(event.target.value);
  };

  const handleFinish = () => {
    handleSendCSV()
  }

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
            <div className={styles.genderRadios}>
              <h3>Gênero</h3>
              <div>
                <input
                  type="radio"
                  id="masculino"
                  value={'masculino'}
                  checked={gender === 'masculino'}
                  onChange={handleOptionChange}
                />
                <label htmlFor="masculino">Masculino</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="feminino"
                  value={'feminino'}
                  checked={gender === 'feminino'}
                  onChange={handleOptionChange}
                />
                <label htmlFor="feminino">Feminino</label>
              </div>
              <div>              
                <input
                  type="radio"
                  id="outro"
                  value={'outro'}
                  checked={gender === 'outro'}
                  onChange={handleOptionChange}
                />
                <label htmlFor="outro">Outro</label>
              </div>

              
            </div>
            
            
           
            <div className={styles.Inputs}>
              
              <RadioInputPlusSelect
                label="Você é uma Pessoa com Deficiência(PcD)?"
                defaultValue="Selecione uma opção"
                value={pcd}
                set={setPcd}
                list={pcdList}
                
              />
              <RadioInputPlusSelect
                
                label="Você apresenta alguma neuroatipicidade?"
                defaultValue="Selecione uma opção"
                value={neuroatypicality}
                set={setNeuroatypicality}
                list={neuroList}
                
              />
            </div>
            <BasicSelect
              label="Como você se autodeclara?"
              defaultValue="Selecione uma opção"
              list={selfDeclareList}
              value={selfDeclaration}
              set = {setSelfDeclaration}
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
                onClick={handleFinish} 
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
