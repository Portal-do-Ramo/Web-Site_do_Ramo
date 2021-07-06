import styles from "../styles/PSE.module.scss";

export default function PSE() {
    return (
        <div id={styles.container}>
            <div id={styles.descriptionContainer}>
                <h1>Lugar onde os projetos se tornam realidade!</h1>
                <p>Se você é estudante de graduação do CEFET-RJ com vontade de aprender,
                conhecer novas ferramentas, colocar os conhecimentos adquiridos
                na faculdade em prática e, além disso, se divertir muito,
                você veio ao lugar certo! 
                </p>
            </div>

            <div id={styles.meetCrews}>
                <div id={styles.buttonContainer}>
                    <button>Conheça nossas equipes</button>
                </div>
                <div id={styles.imageContainer}>
                    <img src="/galerinha_ramo.png" />
                </div>
            </div>
            
            <div id={styles.processSteps}>
                <h1>Nosso processo seletivo é composto por quatro etapas.</h1>
                <div id={styles.allStepsContainer}>
                <div id={styles.firstSteps}>
                    <div className={styles.stepContainer}>
                        <span className={styles.numberStep}>1</span>
                        <span className={styles.step}>Inscrições</span>
                    </div>

                    <div className={styles.stepContainer} id={styles.incricaoStep}>
                        <span className={styles.numberStep}>2</span>
                        <span className={styles.step}>Dinâmica em grupo</span>
                    </div>
                </div>
                <div id={styles.lastSteps}>
                    <div className={styles.stepContainer}>
                            <span className={styles.numberStep}>3</span>
                            <span className={styles.step}>Entrevista</span>
                        </div>

                        <div className={styles.stepContainer} id={styles.faseTraineeStep}>
                            <span className={styles.numberStep}>4</span>
                            <span className={styles.step}>Fase trainee</span>
                        </div>
                    </div>
                </div>
            </div>

            <div id={styles.descriptionSteps}>
                <div className={styles.descriptionStep}>
                    <h1> <span>1)</span> Inscrição</h1>
                    <p>É a fase inicial do processo seletivo. Nesta etapa,  <br/>
                       pegamos algumas informações pessoais e experiências prévias <br/>
                       para analisar o seu perfil para a próxima fase.</p>
                </div>

                <div className={styles.descriptionStep}>
                    <h1> <span>2)</span> Dinâmica</h1>
                    <p>Trata-se de uma fase eliminatório na qual os candidatos participarão <br/>
                       de uma dinâmica em grupo, tendo o desempenho avaliado pelos membros <br/>
                       do Ramo Estudantil IEEE CEFET/RJ.</p>
                </div>

                <div className={styles.descriptionStep}>
                    <h1> <span>4)</span> Entrevista</h1>
                    <p>Os candidatos aprovados na segunda fase, passarão por uma fase de entrevistas <br/>
                       realizadas pelos membros do Ramo Estudantil IEE CEFET/RJ. </p> 
                </div>

                <div className={styles.descriptionStep}>
                    
                    <h1> <span>4)</span> Fase trainee</h1>
                    <p>Nesta etapa, os candidatos serão treinados e testados pelos cases propostos visando <br/>
                        a aprovação para o Ramo. O candidato será avaliado de acordo com todo o desempenho <br/>
                        durante o desenvolvimento do projeto.</p>
                </div>

                <div id={styles.warning}>
                    <h1>Importante</h1>
                    <p>O resultado de cada etapa será encaminhado por e-mail.</p>
                </div>
            </div>


            <div id={styles.inscrevase}>
                <h1>Inscreva-se</h1>
            </div>
            
            

        </div>
    )
}