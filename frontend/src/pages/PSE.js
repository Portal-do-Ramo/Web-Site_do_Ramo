import Header from "../components/Header";
import Footer from "../components/Footer";

import styles from "../styles/PSE.module.scss";

import { useState } from "react";

import api from '../services/api'

export default function PSE({ crews }) {
    let [values, setValues] = useState({fullname: "", birthdate: "", contact: "", email: "", facebook: "", 
    linkedin: "", instagram: "", registry: "", course: "Administração", period: "1º Período", crew: "WIE", 
    motivation: "", area: "Programação", experience: "", dynamic: "Opção 1"});

    async function handleSubmit(event) {
        try {
            event.preventDefault();
            const { status } = await api.post("/pse", values);
            if(status == 200){
                alert("Cadastrado com sucesso");
                window.location.href="/PSE";
            }    
        } catch (err) {
            console.log(err);
        }
    }

    async function handleChange(event) {
        values[event.target.name] = event.target.value;
        setValues(values);
    }
    
    return (
        <div>
            <Header page="PSE"/>
            <div id={styles.pageContent}>
                <section id={styles.introduction}>
                    <div id={styles.descriptionContainer}>
                        <h1>Lugar onde os projetos se tornam realidade!</h1>
                        <p>Se você é estudante de graduação do CEFET-RJ com vontade de aprender,
                        conhecer novas ferramentas, colocar os conhecimentos adquiridos
                        na faculdade em prática e, além disso, se divertir muito,
                        você veio ao lugar certo! 
                        </p>
                        <button type="button">Conheça nossas equipes</button>
                    </div>
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
                                    realizadas pelos membros do Ramo Estudantil IEE CEFET/RJ.
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
                            <button>inscrever-se</button>
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





  /* 
  <section id={styles.inscrevase}>
                        
    <h1 id={styles.inscrevaseTitle}>Inscreva-se</h1>
    
    <div id={styles.formcontainer}>
        
        <form onSubmit={handleSubmit}>
            <div className={styles.fildsetWrapper}>
                <h1>1. Dados pessoais</h1>
                <fieldset>
                    <div className={styles.inputSection}>
                        <label for="fullname">Nome completo</label>
                        <input id="fullname" type="text" name="fullname" onChange={handleChange} required></input>

                        <label for="birthdate">Data de nascimento</label>
                        <input id="birthdate" type="date" name="birthdate" onChange={handleChange} required></input>

                        <label for="contact">Celular</label>
                        <input id="contact" type="text" name="contact" onChange={handleChange} required></input>
                    </div>

                    <div className={styles.boxSizing} />

                    <div className={styles.inputSection}>
                        <label for="email">Email</label>
                        <input id="email" type="email" name="email" onChange={handleChange} required></input>

                        <label for="facebook">Facebook</label>
                        <input id="facebook" type="text" name="facebook" onChange={handleChange}></input>

                        <label for="linkedin">Linkedin</label>
                        <input id="linkedin" type="text" name="linkedin" onChange={handleChange}></input>

                        <label for="instagram">Instagram</label>
                        <input id="instagram" type="text" name="instagram" onChange={handleChange}></input>
                    </div>
                </fieldset>
            </div>

            <div className={styles.fildsetWrapper}>
                <h1>2. Dados da matrícula</h1>
                <fieldset>
                    <div className={styles.inputSection} id={styles.registrationSection}>
                        <label for="registry">Matrícula</label>
                        <input id="registry" type="text" name="registry" onChange={handleChange} required></input>

                        <label for="course">Curso</label>
                        <select name="course" id="course" onChange={handleChange} required>
                            <option selected>Administração</option>
                            <option>Ciência da Computação</option>
                            <option>Engenharia Ambiental</option>
                            <option>Engenharia Civil</option>
                            <option>Engenharia de Controle e Automação</option>
                            <option>Engenharia de Produção</option>
                            <option>Engenharia de Telecomunicações</option>
                            <option>Engenharia Elétrica</option>
                            <option>Engenharia Eletrônica</option>
                            <option>Engenharia Mecânica</option>
                        </select>

                        <label for="period">Período atual</label>
                        <select name="period" id="period" onChange={handleChange} required> 
                            <option  selected>1º Período</option>
                            <option>2º Período</option>
                            <option>3º Período</option>
                            <option>4º Período</option>
                            <option>5º Período</option>
                            <option>6º Período</option>
                            <option>7º Período</option>
                            <option>8º Período</option>
                            <option>9º Período</option>
                            <option>10º Período</option>
                        </select>
                    </div>

                </fieldset>
            </div>

            <div className={styles.fildsetWrapper}>
                <h1>3. Interesse</h1>
                <fieldset>
                    <div className={styles.inputSection} id={styles.interestsLeftSection}>
                        <label for="crew">Equipe</label>
                        <select name="crew" onChange={handleChange} required>
                            {crews.map(crew => (<option key={crew.id} value={crew.name}>{crew.name}</option>))}
                        </select>

                        
                        <label for="area">Área</label>
                        <select name="area" onChange={handleChange} required>
                            <option selected>Programação</option>
                            <option>Arte</option>
                        </select>

                        <label for="dynamic">Dia da dinâmica</label>
                        <select name="dynamic" onChange={handleChange} required>
                            <option>Opção 1</option>
                            <option>Opção 2</option>
                        </select>
                    </div>

                    <div className={styles.boxSizing} />

                    <div className={styles.inputSection}>
                        <label for="motivation">Por quais motivos gostaria de fazer parte do Ramo?</label>
                        <textarea name="motivation" onChange={handleChange}></textarea>

                        <label for="experience">Você teve alguma experiência que pode agregar positivamente na sua trajetória dentro do ramo? Conte pra gente.</label>
                        <textarea name="experience" onChange={handleChange}></textarea>
                    </div>

                </fieldset>
            </div>

            <button type="submit">
                <p>Enviar</p>
            </button>
        </form>
    </div>
</section>
  
  */