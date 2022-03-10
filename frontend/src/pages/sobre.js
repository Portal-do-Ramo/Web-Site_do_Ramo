import Header from '../components/Header'
import Footer from '../components/Footer'
import ValueContainer from '../components/ValueContainer'
import ContactOptions from '../components/ContactOptions'
import styles from "../styles/sobre.module.scss"

export default function Sobre(){
    let values = [
        {
            img: "/valor_1.png",
            title: "Trabalho em equipe",
            description: "Trabalhar de maneira comunicativa e integrada prezando pelo respeito para agir em prol de um objetivo em comum."
        },
        {
            img: "/valor_2.png",
            title: "Pensamento disruptivo",
            description: "Pensar de maneira inovadora e criativa com objetivo de desenvolver projetos técnicos e/ou sociais para impactar positivamente as pessoas a sua volta."
        },
        {
            img: "/valor_3.png",
            title: "Aprendizagem evolutiva",
            description: "Capacitar os membros para que estes repassem o conhecimento de forma atenciosa e com segurança."
        },
        {
            img: "/valor_4.svg",
            title: "Empatia",
            description: "Prezamos a diversidade de pessoas e projetos com a responsabilidade de manter um ambiente confortável, acolhedor e divertido para todo."
        },
        {
            img: "/valor_5.svg",
            title: "Orgulho IEEE",
            description: "Sentimento universal de pertencimento no qual os membros prezam de forma apaixonada pelo desenvolvimento da extensão."
        },
        {
            img: "/valor_6.svg",
            title: "Espírito de liderança",
            description: "Desenvolver, influenciar e estimular a inteligência emocional de nossos membros, formando novos líderes."
        }
    ]

    return (
        <>
            <Header page="sobre"/>

            <main className={styles.main}>
                <div className={styles.banner}></div>
                
                <section className={styles.about}>
                    <div className={styles.aboutContainer}>
                        <section className={styles.aboutLeftContainer}>
                            <article>
                            <div className={styles.historyArrow}></div>
                                <h1>O que é o Ramo ?</h1>
                                <p>     Lorem ipsum dolor sit amet, consectetur 
                                adipiscing elit. Massa tempor, eu aenean 
                                nisi, tortor. Tellus, posuere diam nunc ac ut 
                                iaculis. Pharetra odio id netus eu a, 
                                volutpat porttitor urna. Ac gravida in ac 
                                viverra nibh. Nulla lectus amet, vel mattis. 
                                Mauris, vel et massa netus sollicitudin 
                                ligula. Ipsum aliquam a, sed nisi, mauris 
                                eu risus ut. Ullamcorper libero, lectus 
                                eleifend tincidunt viverra adipiscing 
                                facilisis sed luctus. Odio sed elit, duis 
                                vulputate nunc arcu magna elit. IEEE 
                                nulla nisl sed morbi lorem. Malesuada 
                                viverra consectetur pulvinar auctor. 
                                Consequat, quis est fermentum parturient 
                                proin tristique augue turpis. A amet, 
                                eleifend libero tincidunt at. Praesent 
                                vestibulum sollicitudin ultrices viverra.
                                </p>
                            </article>

                            <article>
                                <div className={styles.familyArrow}></div>
                                <h2>Nossa família</h2>
                                <div className={styles.familyPicture}><img src="/galerinha_ramo.png"/></div>
                                <p>Lorem ipsum dolor sit amet, consectetur 
                                adipiscing elit. Massa tempor, eu aenean 
                                nisi, tortor. Tellus, posuere diam nunc ac ut 
                                iaculis. Pharetra odio id netus eu a, 
                                volutpat porttitor urna. Ac gravida in ac 
                                viverra nibh. Nulla lectus amet, vel mattis. 
                                Mauris, vel et massa netus sollicitudin 
                                ligula. Ipsum aliquam a, sed nisi, mauris 
                                eu risus ut. Ullamcorper libero, lectus 
                                eleifend tincidunt viverra adipiscing 
                                facilisis sed luctus.</p> 

                            </article>
                        </section>
                         
                        <section className={styles.aboutRightContainer}>
                            <article>
                                
                                <h2>História</h2>
                                <p>Criado em 2004, o Ramo Estudantil IEEE CEFET RJ
                                não deu muito certo, porém, em 2016 dois membros 
                                reabriram as portas, formando uma pequena equipe
                                focada em programação e com o intuito apenas
                                de participar do IEEExtreme.</p>
                                    
                                <p>Ainda em 2016, pela primeira vez, o Ramo teve
                                o seu Processo Seletivo Externo. Crescendo aos
                                poucos e tomando forma de extensão, o Ramo era 
                                dividido em pequenos projetos. Agora com uma 
                                nova visão, regras e um estatuto a ser implementado
                                passou a assemelhar-se mais a uma extensão.</p>

                                <p>Em 2017, a presidência começou a dividir as equipes
                                e neste mandato consolidou-se a Wolfbyte, WolfBotz,
                                Wolfpower, SocialWolf e RocketWolf, com poucos 
                                projetos e bem básicos.</p>

                                <p>Em 2018, foram criadas a equipe de diretoria e projetos
                                fazendo com que a gente atingisse um crescimento 
                                enorme, nos permitindo ao chegar ao que somos hoje.</p>
                                    
                                <p>Até hoje, inúmeros alunos do CEFET-RJ passaram pelo
                                Ramo e inúmeros alunos ainda vão passar, dizem que as
                                pessoas que conheceram o Ramo, nunca o esquece. </p>

                                <p>Continuar desenvolvendo pessoas através de projetos
                                técnicos e sociais é a nossa missão e é isso o que nos move
                                a continuar.</p>
                                
                            </article>
                        </section>

                    </div>
                </section>

                <section className={styles.ourValues}>
                    <h2>Nossos valores</h2>

                    <section className={styles.valuesContainer}>
                        <ValueContainer props={values[0]}/>
                        <ValueContainer props={values[1]}/>
                        <ValueContainer props={values[2]}/>
                        <ValueContainer props={values[3]}/>
                        <ValueContainer props={values[4]}/>
                        <ValueContainer props={values[5]}/>
                    </section>
                    
                </section>

                <section className={styles.contactUs}>
                    <h2>Fale conosco!</h2>
                    <p className={styles.subtitle}>Mande uma mensagem de dúvida, <br/> nos ajude com uma idéia!</p>

                    <ContactOptions/>
                </section>

            </main>
            
            <Footer/>
        </>
    )
}