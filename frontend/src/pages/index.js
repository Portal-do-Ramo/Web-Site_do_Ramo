import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import CrewsCard from "../components/CrewsCard/CrewCard";

import Link from "next/link";
import Image from "next/image";
import Carousel from "react-multi-carousel";

import api from '../services/api'

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

export default function Home() {

  let [crews, setCrews ] = useState();
  let [sponsors, setSponsors ] = useState();
  
  useEffect(async () => {
    try{
      crews = await api.get("/crews");
      sponsors = await api.get("/sponsors");
      console.log(crews);
      console.log(sponsors);

      setCrews(crews)
    } catch(err) {
      console.log(err);
    }
  }, []);
  

  return (
    <div>
      <Header/>
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
            <Image id={styles.icon} src="/seu_pai.svg" width={500} height={600} />
            <a href="#" id={styles.button}>
              <p>Saiba mais</p>
              <Image src="/right-arrow.svg" width={32} height={32} />
            </a>
          </div>
        </div>
        <img src="/Background.png" width="100%" />

        <div className={styles.crew_content}>
          <h3>Equipes</h3>
          <section className={styles.logo_content}>
            {/* <CrewsCard name={crews[5].name} image="./WIE_logo.svg"/>
            <Crewcard name="WolfByte" image="../../Wolfbotz_logo.svg" /> */}
            <div className={styles.cards}>
              <a href="#">
                <img src="./WIE_logo.svg" />
                <p>WIE</p>
              </a>
            </div>
            <div className={styles.cards}>
              <a href="#">
                <img src="../../Wolfbyte_logo.svg" />
                <p>WolfByte</p>
              </a>
            </div>
            <div className={styles.cards}>
              <a href="#">
                <img src="../../Wolfbotz_logo.svg" />
                <p>WolfBotz</p>
              </a>
            </div>
            <div className={styles.cards}>
              <a href="#">
                <img src="../../Wolfpower_logo.svg" />
                <p>WolfPower</p>
              </a>
            </div>
            <div className={styles.cards}>
              <a href="#">
                <img src="../../Rocketwolf_logo.svg" />
                <p>RocketWolf</p>
              </a>
            </div>
            <div className={styles.cards}>
              <a href="#">
                <img src="../../Socialwolf_logo.svg" />
                <p>SocialWolf</p>
              </a>
            </div>
            <div className={styles.cards}>
              <a href="#">
                <img src="../../Gestao_logo.svg" />
                <p>Gestão</p>
              </a>
            </div>
            <div className={styles.cards}>
              <a href="#">
                <img src="../../Marketing_logo.svg" />
                <p>Marketing</p>
              </a>
            </div>
          </section>
        </div>
        <img src="/Background.png" width="100%" className={styles.rotate} />
        <section className={styles.parcerias}>
          <h3>Parcerias</h3>

          <div className={styles.dimensionamento}>
            <Carousel
              className={styles.carousel}
              responsive={responsive}
              autoPlay
              autoPlaySpeed={2250}
              className={styles.carousel}
              additionalTransfrom={0}
              arrows
              centerMode={true}
              draggable
              infinite
              keyBoardControl
              minimumTouchDrag={80}
              renderButtonGroupOutside={false}
              responsive={responsive}
              showDots={false}
              slidesToSlide={1}
              swipeable
            >
              <div>
                <a>
                  <img src="/seu_pai.svg" />
                </a>
              </div>
              <div>
                <a>
                  <img src="/seu_pai.svg" />
                </a>
              </div>
              <div>
                <a>
                  <img src="/seu_pai.svg" />
                </a>
              </div>
              <div>
                <a>
                  <img src="/seu_pai.svg" />
                </a>
              </div>
              <div>
                <a>
                  <img src="/seu_pai.svg" />
                </a>
              </div>
              <div>
                <a>
                  <img src="/seu_pai.svg" />
                </a>
              </div>
              <div>
                <a>
                  <img src="/seu_pai.svg" />
                </a>
              </div>
            </Carousel>
          </div>
        </section>
      </div>
      <Footer/>
    </div>
    
  );
}
