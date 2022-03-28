import Header from "../components/Header";
import Footer from "../components/Footer";
import CrewsCard from "../components/CrewsCard";

import Image from "next/image";
import Slider from "react-slick";

import api from '../services/api'

import { useState } from "react";

import {
  ProjectPrevArrow,
  ProjectNextArrow,
} from "../components/Arrows";

import styles from "../styles/index.module.scss";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function Home({ crews, sponsors }) {

  let [index, setIndex] = useState(0);

  const settings = { //Configurações do Slider dos parceiros
    autoplay: true,
    autoPlaySpeed: 1000,
    infinite: true,
    centerMode: true,
    variableWidth: true,
    speed: 500,
    slidesToScroll: 1,
    nextArrow: <ProjectNextArrow />,
    prevArrow: <ProjectPrevArrow />,
    beforeChange: (current, prox) => setIndex(prox),
    className: styles.slider,
  };

  return (
    <div id={styles.container}>
      <Header page="inicio">
        <div className={styles.wolfImageContainer}>
          <Image 
            src="/seu_pai.svg"
            alt="Lobo do Ramo IEEE CEFET-RJ"
            width={450}
            height={450}
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
          <Slider {...settings}>
            {
              sponsors.map((sponsor, idx) => {
                return (
                <div className={idx === index ? styles.current : styles.other} key={sponsor.id}>
                  <img src={sponsor.image} height={180}/>
                  <p>{idx === index ? sponsor.name : []}</p>
                </div>
                )
              })
            }
          </Slider>
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
