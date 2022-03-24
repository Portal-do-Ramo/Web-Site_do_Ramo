import { useRouter } from 'next/router'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-multi-carousel/lib/styles.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

import {
  PrevArrow,
  NextArrow,
} from "../components/Arrows";

import { useEffect, useState } from "react";
import Slider from "react-slick";

import { ProjectCard } from "../components/ProjectCard";

import styles from "../styles/equipes.module.scss";

import api from "../services/api";

export default function Equipes({ crews }) {
  const { query } = useRouter();
  const [index, setIndex] = useState(0);
  
  useEffect(() => { //Tem como função mudar o index para a equipe que foi selecionada na tela Home
    if (query.crewIndex) {
      setIndex(parseInt(query.crewIndex));
    }
  }, [query]);

  const crewsSliderSettings = {
    arrows: true,
    infinite: true,
    centerMode: true,
    adaptiveHeight: true,
    variableWidth: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, prox) => setIndex(prox),
    className: styles.slider,
  };

  return (
    <div>
      <Header page="equipes"/>
      
      <div className={styles.all}>

        <section className={styles.apresentation}>
          <div className={styles.descrição}>
            <h1>{crews[index].name}</h1>
            <p>{crews[index].about}</p>
          </div>
          

          <div className={styles.allcarousel}>
            <h2>Escolha sua equipe!</h2>

            <Slider {...crewsSliderSettings}>
              {crews.map((crew, idx) => (
                <div className>
                  <div className={styles.carrosel}>
                    <div className={idx === index ? styles.current : styles.none} >
                      <img src={crew.image} />
                      <p className={styles.crewLabel}> 
                        {idx === index && crew.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
        
        <section className={styles.projetos}>
          
          <div className={styles.leftcontainer}>
            <h1>Projetos</h1>
            <p>Conheça todos os projetos da equipe WolfByte</p>
            
            {crews.map((crew, idx) => (
            <div>
              {idx === index && (
                (crew.projects || []).map((project) => (
                  <ProjectCard projetos={project} />
                ))
              )}
            </div>
          ))}
            
          </div>

          <div className={styles.rightcontainer}>

          </div>
        </section>

        <div className={styles.projetos}>

          { crews.map((crew, idx) => (
            <div>
              { idx === index && (
                (crew.projetosAtuais || []).map((projetos) => (
                    <ProjectCard projetos={projetos} />
                  ))
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
                            <span>{award.name}</span>
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
