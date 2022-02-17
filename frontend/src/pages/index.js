import Header from "../components/Header";
import Footer from "../components/Footer";
import CrewsCard from "../components/CrewsCard";

import Image from "next/image";
import Slider from "react-slick";

import api from '../services/api'

import { useState } from "react";

import "react-multi-carousel/lib/styles.css";

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
    adaptiveHeight: true,
    variableWidth: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    beforeChange: (current, prox) => setIndex(prox),
    className: styles.slider,
  };

  return (
    <div>
      <Header page="inicio"/>
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
              Cursus odio nunc ipsum ipsum nunc. Mauris mi fringilla nibh a.
              Cursus tincidunt fames faucibus id iaculis egestas malesuada dis
              sed. Aliquet vel eu in arcu, adipiscing adipiscing luctus ligula
              tellus. Nullam ullamcorper. Ac vestibulum, posuere blandit mauris.
              Semper accumsan, arcu sit egestas phasellus in senectus etiam et.
              Scelerisque in a quisque mattis iaculis pellentesque bibendum
              bibendum diam. Imperdiet velit ultricies vestibulum aenean cursus
              iaculis eget. Lacus, aliquet tellus viverra volutpat aliquam mauris
              sed hendrerit cursus. Laoreet maecenas aenean facilisi rhoncus. A
              mi, faucibus eu tortor iaculis fringilla nullam sed platea. Et arcu
              sed auctor vel. Quis sagittis, eros dolor facilisi. Mi massa urna,
              commodo in dignissim. Varius neque quam in.{" "}
            </p>
          </div>
          <div id={styles.main_container}>
            <img id={styles.icon} src="/seu_pai.svg"/>
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
              crews.map(crew => {
                return (<CrewsCard key={crew.id} name={crew.name} image={crew.image} />)
              })
            }
          </section>
        </div>
        <img src="/Background.png" width="100%" className={styles.rotate} />
        <div className={styles.parcerias}>
          <h3>Parceiros</h3>
          <Slider {...settings}>
            {
              sponsors.map((sponsor, idx) =>{
                return(
                <div className={idx === index ? styles.atual : styles.other}>
                  <img src={sponsor.image} />
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
    revalidate: 60 * 60 * 24 // 24 Horas
  }
}
