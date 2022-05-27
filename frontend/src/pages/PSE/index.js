import { useRouter } from "next/router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import styles from "../../styles/PSE.module.scss";

import { useState } from "react";

import api from '../../services/api'

export default function PSE({ crews }) {
    const router = useRouter()

    let [values, setValues] = useState({fullname: "", birthdate: "", contact: "", email: "", facebook: "", 
    linkedin: "", instagram: "", registry: "", course: "Administração", period: "1º Período", crew: "WIE", 
    motivation: "", area: "Programação", experience: "", dynamic: "Opção 1"});

    return (
        <div>
            <Header page="PSE"/>
            <div id={styles.pageContent}>
                <section className={styles.introductionContainer}>
                    <article id={styles.introduction}>
                        <div id={styles.descriptionContainer}>
                            <h1>Lugar onde os projetos se tornam realidade!</h1>
                            <p>Se você é estudante de graduação do CEFET-RJ com vontade de aprender,
                            conhecer novas ferramentas, colocar os conhecimentos adquiridos
                            na faculdade em prática e, além disso, se divertir muito,
                            você veio ao lugar certo! 
                            </p>
                            <button type="button">Conheça nossas equipes</button>
                        </div>
                    </article>
                </section>

                <section id={styles.steps}>
                    <h2>Etapas do nosso processo seletivo.</h2>
                    <div id={styles.stepsContainer}>
                        <div className={styles.oddSteps}>
                            <span className={styles.numberStep}>1</span>
                            <div className={styles.stepDetail}>
                                <h3>Inscrições</h3>
                                <p>
                                    É a fase inicial do processo seletivo. Nesta etapa,  
                                    pegamos algumas informações pessoais e experiências prévias 
                                    para analisar o seu perfil para a próxima fase.
                                </p>
                            </div>
                        </div>

                        <div className={styles.evenSteps} id={styles.inscricaoStep}>
                            <span className={styles.numberStep}>2</span>
                            <div className={styles.stepDetail}>
                                <h3>Dinâmica em grupo</h3>
                                <p>
                                    Trata-se de uma fase eliminatório na qual os candidatos participarão 
                                    de uma dinâmica em grupo, tendo o desempenho avaliado pelos membros 
                                    do Ramo Estudantil IEEE CEFET/RJ.
                                </p>
                            </div>
                        </div>

                        <div className={styles.oddSteps}>
                            <span className={styles.numberStep}>3</span>
                            <div className={styles.stepDetail}>
                                <h3>Entrevista</h3>
                                <p>
                                    Os candidatos aprovados na segunda fase, passarão por uma fase de entrevistas 
                                    realizadas pelos membros do Ramo Estudantil IEEE CEFET/RJ.
                                </p> 
                            </div>
                        </div>

                        <div className={styles.evenSteps} id={styles.faseTraineeStep}>
                            <span className={styles.numberStep}>4</span>
                            <div className={styles.stepDetail}>
                                <h3>Fase Trainee</h3>
                                <p>
                                    Nesta etapa, os candidatos serão treinados e testados pelos cases propostos visando 
                                    a aprovação para o Ramo. O candidato será avaliado de acordo com todo o desempenho
                                    durante o desenvolvimento do projeto.
                                </p>
                            </div>
                        </div>
                        </div>

                        <div id={styles.warning}>
                        <h3>Importante</h3>
                        <p>O resultado de cada etapa será encaminhado por e-mail.</p>
                    </div>
                </section> 

                <section className={styles.registerContainer}>
                    <article className={styles.register}>
                        <div className={styles.whiteSpace}></div>
                        <div className={styles.joinContainer}>
                            <span>Faça parte do nosso time</span>
                            <button type="button" onClick={() => router.push("/PSE/cadastro?page=1")}>inscrever-se</button>
                        </div>
                    </article>
                </section>
            </div>

            <Footer/>
        </div>
        
    )
}

export const getStaticProps = async () => {
    let { data: crews } = await api.get("/crews");
    
    // let crews = data.map(crew => {
    //   return {
    //     id: crew.id,
    //     name: crew.name,
    //   }
    // });
  
    return {
      props: {
        crews
      },
      revalidate: 60 * 60 * 24 // 24 Horas
    }
  }