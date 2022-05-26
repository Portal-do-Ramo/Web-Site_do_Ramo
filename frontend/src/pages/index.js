import Header from "../components/Header";
import Footer from "../components/Footer";
import CrewsCard from "../components/CrewsCard";

import Image from "next/image";

import api from '../services/api'

import styles from "../styles/index.module.scss";

export default function Home({ crews, sponsors }) {

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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed odio
              elementum bibendum aliquam. Vel, tempor tincidunt enim, eu. Ut non
              dui nulla massa viverra. Pellentesque id integer vulputate nulla sed
              in aenean. Pulvinar suspendisse vitae etiam sem natoque aliquam amet
              pulvinar velit. Aliquet tempor iaculis curabitur cursus libero.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed odio
              elementum bibendum aliquam. Vel, tempor tincidunt enim, eu. Ut non
              dui nulla massa viverra. Pellentesque id integer vulputate nulla sed
              in aenean. Pulvinar suspendisse vitae etiam sem natoque aliquam amet
              pulvinar velit. Aliquet tempor iaculis curabitur cursus libero.
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
                return (<CrewsCard key={crew.id} index={index} name={crew.name} image={crew.image} />)
              })
            }
          </section>
        </div>
        
        <img src="/Background.png" width="100%" className={styles.rotate} />
        
        <div className={styles.parcerias}>
          <h3>Parceiros</h3>
          <div className={styles.partnerGrid}>
            <img src="/sponsor-logo-motim.png" width={"150px"} height={"150px"}></img>
            <img src="/sponsor-logo-TEC_CI_RGB.png" width={"300px"} height={"70px"}></img>
            <img src="/sponsor-logo-squair.jpg" width={"150px"} height={"150px"}></img>
            <img src="/sponsor-logo-Universinagem.png" width={"120px"} height={"80px"}></img>
            
            <img src="/sponsor-logo-voitto.png" width={"150px"} height={"150px"}></img>
            <img src="/sponsor-logo-botz-loja.png" width={"175px"} height={"100px"}></img>
            <img src="/sponsor-pololu-logo.jpg" width={"250px"} height={"130px"}></img>
            <img src="/sponsor-logo-solidworks.png" width={"100px"} height={"100px"}></img>

            <img src="/sponsor-logo-Betabit.jpg" width={"150px"} height={"150px"}></img>
            <img src="/sponsor-logo-alura.png" width={"210px"} height={"110px"}></img>
            <img src="/sponsor-logo-altium.png" width={"170px"} height={"75px"}></img>
            <img src="/sponsor-logo-mlabs.png" width={"150px"} height={"150px"}></img>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export const getStaticProps = async () => {
  let {data : crews} = await api.get("/crews");
  let {data : sponsors} = await api.get("/sponsors");

  return {
    props: {
      crews,
      sponsors
    },
    revalidate: 1 // 24 Horas
  }
}
