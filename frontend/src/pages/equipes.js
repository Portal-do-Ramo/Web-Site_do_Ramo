import Header from "../components/Header/index";
import Footer from "../components/Footer/index";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-multi-carousel/lib/styles.css";

import { Projetos } from "../utils/projetos";
import {
  PrevArrow,
  NextArrow,
  ProjectPrevArrow,
  ProjectNextArrow,
} from "../components/Arrows";

import styles from "../styles/equipes.module.scss";

import api from "../services/api";

import equipes from "../services/crewTestData";

{/*export const getStaticProps = async () => {
    const res = await api.get('crews');
    const data = await res.json();

    return {
      props: { equipes : data}  
    }
  }*/}

export default function Equipes() {
  const [equipesApi, setEquipes] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(async () => {
    try {
      let equipesApi = await api.get("/crews");
      setEquipes(equipesApi);
      console.log(equipesApi);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const settings = {
    arrows: true,
    infinite: true,
    centerMode: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, prox) => setIndex(prox),
    className: styles.slider,
  };
  const psettings = {
    arrows: true,
    infinite: false,
    centerMode: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <ProjectNextArrow />,
    prevArrow: <ProjectPrevArrow />,

    className: styles.slider,
  };
  return (
    <div>
      <Header />
      <div className={styles.all}>
        <div className={styles.equipes}>
          <div className={styles.descrição}>
            <h1>{equipes[index].title}</h1>
            <p>{equipes[index].description}</p>
          </div>

          <div className={styles.allcarousel}>
            <h1>Escolha sua equipe!</h1>

            <Slider {...settings}>
              {equipes.map((equipes, idx) => (
                <div className>
                  <div className={styles.carrosel}>
                    <div className={idx === index ? styles.atual : styles.sem}>
                      <img src={equipes.img} />
                    </div>
                   <p className={styles.crewLabel}> {idx === index ? <h2>{equipes.title}</h2> : null}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className={styles.projetos}>
          <h1>Projetos Atuais</h1>

          {equipes.map((equipes, idx) => (
            <div>
              {idx === index ? (
                <div>
                  <Slider {...psettings}>
                    {equipes.projetosAtuais.map((projetos) => (
                      <Projetos projetos={projetos} />
                    ))}
                  </Slider>
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <div className={styles.projetos}>
          <h1>Projetos Finalizados</h1>

          {equipes.map((equipes, idx) => (
            <div>
              {idx === index ? (
                <div>
                  <Slider {...psettings}>
                    {equipes.projetosAtuais.map((projetos) => (
                      <Projetos projetos={projetos} />
                    ))}
                  </Slider>
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <div className={styles.premiosGeral}>
          <h1>Prêmios</h1>
          {equipes.map((equipes, idx) => (
            <div>
              {idx === index ? (
                <div>
                  {equipes.premios.map((premios) => (
                    <div className={styles.premios}>
                      <table>
                        <tr>
                          <td>
                            <img src={premios.img} />
                          </td>
                          <td>
                            <h1>{premios.title}</h1>
                          </td>
                        </tr>
                      </table>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
