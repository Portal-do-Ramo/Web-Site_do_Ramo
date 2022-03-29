import { useRouter } from 'next/router';

import Header from "../components/Header";
import Footer from "../components/Footer";

import {
  PrevArrow,
  NextArrow,
  AwardPrevArrow,
  AwardNextArrow,
} from "../components/Arrows";

import { useEffect, useState } from "react";

import { ProjectCard } from "../components/ProjectCard";
import { ProjectDetail } from "../components/ProjectDetail";

import styles from "../styles/equipes.module.scss";

import api from "../services/api";

export default function Equipes({ crews }) {
  const { query } = useRouter();
  const [crewIndex, setCrewIndex] = useState(0);
  const [projectIndex, setProjectIndex] = useState(0);
  const [awardTranslateX, setAwardTranslateX] = useState(0);
  
  useEffect(() => { //Tem como função mudar o index para a equipe que foi selecionada na tela Home
    if (query.crewIndex) {
      setCrewIndex(parseInt(query.crewIndex));
    }
  }, [query]);

  function handleChangeCrewSelected(operation) {
    setProjectIndex(0);
    setAwardTranslateX(0);

    if (operation === 1) {
      document.getElementById("currentProjectImage").style.transform = "translateX(-220px)";
      document.getElementById("nextProjectImage").style.transform = "translateX(-220px)";
      
      setTimeout(() => {
        document.getElementById("currentProjectImage").style.transition = "none";
        document.getElementById("nextProjectImage").style.transition = "none";
        document.getElementById("currentProjectImage").style.transform = "translateX(0)";
        document.getElementById("nextProjectImage").style.transform = "translateX(0)";
        setCrewIndex(crewIndex + 1 === crews.length ? 0 : crewIndex + 1);
      }, 500);

      document.getElementById("currentProjectImage").style.transition = "transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)";
      document.getElementById("nextProjectImage").style.transition = "transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)";
    
    } else {
      document.getElementById("currentProjectImage").style.transform = "translateX(220px)";
      document.getElementById("previousProjectImage").style.transform = "translateX(220px)";
      
      setTimeout(() => {
        document.getElementById("currentProjectImage").style.transition = "none";
        document.getElementById("previousProjectImage").style.transition = "none";
        document.getElementById("currentProjectImage").style.transform = "translateX(0)";
        document.getElementById("previousProjectImage").style.transform = "translateX(0)";
        setCrewIndex(crewIndex - 1 === -1 ? crews.length - 1 : crewIndex - 1);
      }, 500);

      document.getElementById("currentProjectImage").style.transition = "transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)";
      document.getElementById("previousProjectImage").style.transition = "transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)";
    }
  }

  function handleChangeAwardSelected(operation) {
    if (operation === 1 && awardTranslateX > -1 * 184 * (crews[crewIndex].awards.length - 3)) {
      setAwardTranslateX(awardTranslateX - 184);
    } else if (operation === -1 && awardTranslateX < 0) {
      setAwardTranslateX(awardTranslateX + 184);
    }
  }
  
  useEffect(() => {
    document.getElementById(styles.awardsImagesContainer).style.transform = `translateX(${awardTranslateX}px)`;
  }, [awardTranslateX]);

  return (
    <div>
      <Header page="equipes"/>
      
      <div className={styles.all}>

        <section className={styles.presentation}>
          <div className={styles.descrição}>
            <h1>{crews[crewIndex].name}</h1>
            <p>{crews[crewIndex].about}</p>
          </div>

          <div className={styles.carouselContainer}>
            <h2>Escolha sua equipe!</h2>

            <section className={styles.carousel}>
              <PrevArrow onClick={() => handleChangeCrewSelected(-1)}/>
              
              <article className={styles.crewSelected}>

                <div className={styles.imagesCarouselContainer}>
                  { crewIndex === 0
                    ? <img src={crews[crews.length - 1].image} className={styles.previousProjectImage} id="previousProjectImage"/>
                    : <img src={crews[crewIndex - 1].image} className={styles.previousProjectImage} id="previousProjectImage"/>
                  }
                  
                  <img src={crews[crewIndex].image} className={styles.currentProjectImage} id="currentProjectImage" />

                  { crewIndex === crews.length - 1
                    ? <img src={crews[0].image} className={styles.nextProjectImage} id="nextProjectImage"/>
                    : <img src={crews[crewIndex + 1].image} className={styles.nextProjectImage} id="nextProjectImage"/>
                  }
                </div>

                <p> {crews[crewIndex].name} </p>
              </article>

              <NextArrow onClick={() => handleChangeCrewSelected(+1)}/>
            </section>
          </div>
        </section>
        
        <section className={styles.projetos}>
          <div className={styles.leftcontainer}>
            <h1>Projetos</h1>
            <p>Conheça todos os projetos da equipe WolfByte</p>

            {crews[crewIndex].projects.map((project, idx) => {
              return (
                <ProjectCard 
                  id={projectIndex === idx && styles.active}
                  project={project}
                  key={project.id} 
                  onCLick={() => setProjectIndex(idx)}
                />
              )
            })}
          </div>
          
          <div className={styles.rightcontainer}>
            <ProjectDetail 
              project={crews[crewIndex].projects[projectIndex]} 
              key={crews[crewIndex].projects[projectIndex].id}
            />
          </div>
        </section>

        <section className={styles.awards_section}>
          <img className={styles.topWave} src='/Background.png'></img>
          <div className={styles.awards}>
            <h2>Prêmios</h2>

            <div className={styles.awardSlider}>
              <AwardPrevArrow onClick={() => handleChangeAwardSelected(-1)} disabled={awardTranslateX === 0}/>
              <section className={styles.awardsContainer}>
                <div id={styles.awardsImagesContainer}>
                  {
                    crews[crewIndex].awards.map((award, idx) => {
                      return (
                      <article className={styles.award} key={idx}>
                        <img src="award.svg" alt="award image"/>
                        <strong>{award.placing}</strong>
                        <span>{award.name}</span>
                        <p>{award.year && award.year}</p>
                      </article>
                      )
                    })
                  }
                </div>
              </section>
              <AwardNextArrow onClick={() => handleChangeAwardSelected(1)} disabled={!(awardTranslateX > -1 * 184 * (crews[crewIndex].awards.length - 3))}/>
            </div>
          </div>
          <img className={styles.bottomWave} src='/Background.png'></img>
        </section>
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
