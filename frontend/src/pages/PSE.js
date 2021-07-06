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
            
            <section id={styles.processSteps}>
                <h1 id={styles.processStepsTitle}>Nosso processo seletivo é composto por quatro etapas.</h1>
                <div id={styles.allStepsContainer}>
                <div id={styles.firstSteps}>
                    <div className={styles.stepContainer}>
                        <span className={styles.numberStep}>1</span>
                        <span className={styles.step}>Inscrições</span>
                    </div>

                    <div className={styles.stepContainer} id={styles.inscricaoStep}>
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
                <div id={styles.descriptionSteps}>
                <div className={styles.descriptionStep}>
                    <h1> <span>1)</span> Inscrição</h1>
                    <p>É a fase inicial do processo seletivo. Nesta etapa,  
                       pegamos algumas informações pessoais e experiências prévias 
                       para analisar o seu perfil para a próxima fase.</p>
                </div>

                <div className={styles.descriptionStep}>
                    <h1> <span>2)</span> Dinâmica</h1>
                    <p>Trata-se de uma fase eliminatório na qual os candidatos participarão 
                       de uma dinâmica em grupo, tendo o desempenho avaliado pelos membros 
                       do Ramo Estudantil IEEE CEFET/RJ.</p>
                </div>

                <div className={styles.descriptionStep}>
                    <h1> <span>4)</span> Entrevista</h1>
                    <p>Os candidatos aprovados na segunda fase, passarão por uma fase de entrevistas 
                       realizadas pelos membros do Ramo Estudantil IEE CEFET/RJ. </p> 
                </div>

                <div className={styles.descriptionStep}>
                    
                    <h1> <span>4)</span> Fase trainee</h1>
                    <p>Nesta etapa, os candidatos serão treinados e testados pelos cases propostos visando 
                        a aprovação para o Ramo. O candidato será avaliado de acordo com todo o desempenho
                        durante o desenvolvimento do projeto.</p>
                </div>

                <div id={styles.warning}>
                    <h1>Importante</h1>
                    <p>O resultado de cada etapa será encaminhado por e-mail.</p>
                </div>
            </div>

            </section>

            

            <section id={styles.inscrevase}>
                
                <h1>Inscreva-se</h1>
                <div>
                    
                        <form method="POST" action="#">
                            <fieldset>
                                <legend>1. Dados pessoais</legend>

                                <label for="fullname">Nome completo</label>
                                <input id="fullname" type="text" name="fullname" required></input>

                                <label for="birthdate">Data de nascimento</label>
                                <input id="birthdate" type="date" name="birthdate" required></input>

                                <label for="contact">Celular</label>
                                <input id="contact" type="text" name="contact" required></input>

                                <label for="email">Email</label>
                                <input id="email" type="email" name="email" required></input>

                                <label for="facebook">Facebook</label>
                                <input id="facebook" type="text" name="facebook"></input>

                                <label for="linkedin">Linkedin</label>
                                <input id="linkedin" type="text" name="linkedin"></input>

                                <label for="instagram">Instagram</label>
                                <input id="instagram" type="text" name="instagram"></input>
                            </fieldset>

                            <fieldset>
                                <legend>2. Dados da matrícula</legend>

                                <label for="matricula">Matrícula</label>
                                <input id="matricula" type="text" name="matricula" required></input>

                                <label for="curso">Curso</label>
                                <select required name="curso" id="curso">
                                    <option value="1" selected>Curso 1</option>
                                    <option value="2">Curso 2</option>
                                    <option value="3">Curso 3</option>
                                    <option value="4">Curso 4</option>
                                    <option value="5">Curso 5</option>
                                    <option value="6">Curso 6</option>
                                    <option value="7">Curso 7</option>
                                    <option value="8">Curso 8</option>
                                    <option value="9">Curso 9</option>
                                    <option value="10">Curso 10</option>
                                </select>


                                <label for="periodo">Período atual</label>
                                <select required name="periodo" id="periodo"> 
                                    <option value="1" selected>1º Período</option>
                                    <option value="2">2º Período</option>
                                    <option value="3">3º Período</option>
                                    <option value="4">4º Período</option>
                                    <option value="5">5º Período</option>
                                    <option value="6">6º Período</option>
                                    <option value="7">7º Período</option>
                                    <option value="8">8º Período</option>
                                    <option value="9">9º Período</option>
                                    <option value="10">10º Período</option>
                                </select>

                            </fieldset>

                            <fieldset>
                                <legend>3. Interesse</legend>
                            </fieldset>

                            <button type="submit">Enviar</button>
                        </form>
                </div>



            </section>
            
            

        </div>
    )
}