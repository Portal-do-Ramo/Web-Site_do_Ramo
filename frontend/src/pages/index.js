import Header from "../components/Header";
import Footer from "../components/Footer";
import CrewsCard from "../components/CrewsCard";

import Image from "next/image";

import api from '../services/api'

import styles from "../styles/index.module.scss";

export default function Home({ crews }) {

  return (
    <div id={styles.container}>
      <Header page="inicio">
        <div className={styles.wolfImageContainer}>
          <Image 
            src="/seu_pai.svg"
            alt="Lobo do Ramo IEEE CEFET-RJ"
            width={300}
            height={300}
          />
        </div>
      </Header>
      
      <div id={styles.page_container}>
        <div id={styles.text_container}>
          <div id={styles.ourStory}>
            
            <h1>Nossa História</h1>

            <p>
              O Ramo Estudantil IEEE teve um inicio humilde em 2004, mas voltou mais forte em 2016, desde então crescendo passo a passo.
              Começou focado somente na parte de programação computacional, mas conforme o tempo expandiu as áreas de atuação, criando 
              equipes para cada uma dessas áreas.
              <br />
              <br />
              Buscamos auxiliar no crescimento das pessoas tanto como profissional como quanto pessoa, com projetos em equipe que 
              aceitam qualquer nível de experiência, desde que esteja disposto/a a aprender.
            </p>
          </div>

          <div id={styles.main_container}>
            <a href="/sobre" id={styles.button}>
              <p>Saiba mais</p>
              <Image src="/right-arrow.svg" width={32} height={32} />
            </a>
          </div>
        </div>

        <img src="/Background.png" width="100%" />

        <div className={styles.crew_content}>

          <h3>Equipes</h3>

          <section className={styles.logo_content}>
            {
              crews.map((crew, index) => {
                return (
                  <CrewsCard
                    key={crew.id}
                    index={index} 
                    name={crew.name} 
                    image={crew.imageURL} 
                  />
                )
              })
            }
          </section>
        </div>
        
        <img src="/Background.png" width="100%" className={styles.rotate} />
        
        <div className={styles.parcerias}>
          <h3>Parceiros</h3>
          <div className={styles.partnerGrid}>
            <img id={styles.motim} src="/sponsor-logo-motim.png"></img>
            <img id={styles.tecci} src="/sponsor-logo-TEC_CI_RGB.png"></img>
            <img id={styles.squair} src="/sponsor-logo-squair.jpg"></img>
            <img id={styles.u} src="/sponsor-logo-Universinagem.png"></img>
            
            <img id={styles.voitto} src="/sponsor-logo-voitto.png"></img>
            <img id={styles.botz} src="/sponsor-logo-botz-loja.png"></img>
            <img id={styles.pololu} src="/sponsor-pololu-logo.jpg"></img>
            <img id={styles.solidworks} src="/sponsor-logo-solidworks.png"></img>

            <img id={styles.betabit} src="/sponsor-logo-Betabit.jpg"></img>
            <img id={styles.alura} src="/sponsor-logo-alura.png"></img>
            <img id={styles.altium} src="/sponsor-logo-altium.png"></img>
            <img id={styles.mlabs} src="/sponsor-logo-mlabs.png"></img>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export const getStaticProps = async () => {
  let {data : crews} = await api.get("/crews");

  return {
    props: {
      crews
    },
    revalidate: 60 * 60 * 4 // 4 Horas
  }
}
