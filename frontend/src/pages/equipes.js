import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-multi-carousel/lib/styles.css";

import Header from "../components/Header"; //Components
import Footer from "../components/Footer";

import {
  PrevArrow,
  NextArrow,
  ProjectPrevArrow,
  ProjectNextArrow,
} from "../components/Arrows";

import { useState } from "react";
import Slider from "react-slick";

import { ProjectCard } from "../components/ProjectCard";

import styles from "../styles/equipes.module.scss";

import api from "../services/api";

export default function Equipes({ crews }) {
  const [index, setIndex] = useState(0);
  
  function wrapElIdx(i) { //Controla o index do carrossel de equipes, fazendo o loop de infinito
    var n = crews.length;
    var r = Math.floor(n/2);
    if((i-index)>r)i-=n;
    if((i-index)<-r)i+=n;
    return i;
  }

  const crewsSliderSettings = {
    arrows: true,
    infinite: true,
    centerMode: true,
    adaptiveHeight: true,
    variableWidth: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, prox) => setIndex(prox),
    className: styles.slider,
  };

  const projectsSliderSettings = {
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
      <Header page="equipes"/>
      
      <div className={styles.all}>
        <div className={styles.equipes}>

          { crews.length !== 0 && 
            <div className={styles.descrição}>
              <h1>{crews[index].name}</h1>
              <p>{crews[index].about}</p>
            </div>
          }

          <div className={styles.allcarousel}>
            <h1>Escolha sua equipe!</h1>

            <Slider {...crewsSliderSettings}>
              {crews.map((crew, idx) => (
                <div className>
                  <div className={styles.carrosel}>
                    <div className=
                      {
                        idx === index ? styles.atual : styles.sem} 
                        style={{transform: 
                          "translateX(" +
                          (index-wrapElIdx(idx))*75 +
                          "px) scale(" +
                          (1.0-Math.abs(index-wrapElIdx(idx)) *
                          0.25) * 140.0 + "%)"
                        }
                      }>
                      <img src={crew.image} />
                      <p className={styles.crewLabel} style={{height: 10+"rem"}}> 
                        {idx === index && <h2>{crew.name}</h2>}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        
        <div className={styles.projetos}>
          <h1>Projetos Atuais</h1>

          {crews.map((crew, idx) => (
            <div>
              {idx === index && (
                <div>
                  <Slider {...projectsSliderSettings}>
                    {(crew.projects || []).map((project) => (
                      <ProjectCard projetos={project} />
                    ))}
                  </Slider>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.projetos}>
          <h1>Projetos Finalizados</h1>

          { crews.map((crew, idx) => (
            <div>
              { idx === index && (
                <div>
                  <Slider {...projectsSliderSettings}>
                    {(crew.projetosAtuais || []).map((projetos) => (
                      <ProjectCard projetos={projetos} />
                    ))}
                  </Slider>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className={styles.premiosGeral}>
          <h1>Prêmios</h1>

          { crews.map((crew, idx) => (
            <div>
              { idx === index && (
                <div>
                  { crew.awards ? crew.awards.map((award) => (
                    <div className={styles.premios}>
                      <table>
                        <tr>
                          <td>
                            <img src={award.image} />
                          </td>
                          <td>
                            <h1>{award.name}</h1>
                          </td>
                        </tr>
                      </table>
                    </div>
                  )) : 
                    <div>Sem Prêmios</div>
                  } 
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export const getStaticProps = async () => {
  let { data } = await api.get("/crews");
  
  // let crews = data.map(crew => {
  //   return {
  //     id: crew.id,
  //     title: crew.name,
  //     description: crew.about,
  //     image: crew.image.replace('.', '')
  //   }
  // });

  let crews = data;

  return {
    props: {
      crews
    },
    revalidate: 1 // 24 Horas
  }
}
