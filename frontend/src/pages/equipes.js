import { useRouter } from 'next/router'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-multi-carousel/lib/styles.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

import {
  PrevArrow,
  NextArrow,
  ProjectNextArrow,
  ProjectPrevArrow,
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
  
  useEffect(() => { //Tem como função mudar o index para a equipe que foi selecionada na tela Home
    if (query.crewIndex) {
      setCrewIndex(parseInt(query.crewIndex));
    }
  }, [query]);

  function handleChangeCrewSelected(operation) {
    setProjectIndex(0);

    if (operation === 1) {
      document.getElementById("currentImage").style.transform = "translateX(-220px)";
      document.getElementById("nextImage").style.transform = "translateX(-220px)";
      
      setTimeout(() => {
        document.getElementById("currentImage").style.transition = "none";
        document.getElementById("nextImage").style.transition = "none";
        document.getElementById("currentImage").style.transform = "translateX(0)";
        document.getElementById("nextImage").style.transform = "translateX(0)";
        setCrewIndex(crewIndex + 1 === crews.length ? 0 : crewIndex + 1);
      }, 500);

      document.getElementById("currentImage").style.transition = "transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)";
      document.getElementById("nextImage").style.transition = "transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)";
    
    } else {
      document.getElementById("currentImage").style.transform = "translateX(220px)";
      document.getElementById("previousImage").style.transform = "translateX(220px)";
      
      setTimeout(() => {
        document.getElementById("currentImage").style.transition = "none";
        document.getElementById("previousImage").style.transition = "none";
        document.getElementById("currentImage").style.transform = "translateX(0)";
        document.getElementById("previousImage").style.transform = "translateX(0)";
        setCrewIndex(crewIndex - 1 === -1 ? crews.length - 1 : crewIndex - 1);
      }, 500);

      document.getElementById("currentImage").style.transition = "transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)";
      document.getElementById("previousImage").style.transition = "transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)";
    }
  }

  return (
    <div>
      <Header page="equipes"/>
      
      <div className={styles.all}>

        <section className={styles.apresentation}>
          <div className={styles.descrição}>
            <h1>{crews[crewIndex].name}</h1>
            <p>{crews[crewIndex].about}</p>
          </div>

          <div className={styles.carouselContainer}>
            <h2>Escolha sua equipe!</h2>

            <section className={styles.carousel}>
              <PrevArrow style={styles.prevArrow} onClick={() => handleChangeCrewSelected(-1)}/>
              
              <article className={styles.crewSelected}>

                <div className={styles.imagesCarouselContainer}>
                  { crewIndex === 0
                    ? <img src={crews[crews.length - 1].image} className={styles.previousImage} id="previousImage"/>
                    : <img src={crews[crewIndex - 1].image} className={styles.previousImage} id="previousImage"/>
                  }
                  
                  <img src={crews[crewIndex].image} className={styles.currentImage} id="currentImage" />

                  { crewIndex === crews.length - 1
                    ? <img src={crews[0].image} className={styles.nextImage} id="nextImage"/>
                    : <img src={crews[crewIndex + 1].image} className={styles.nextImage} id="nextImage"/>
                  }
                </div>

                <p> {crews[crewIndex].name} </p>
              </article>

              <NextArrow style={styles.nextArrow} onClick={() => handleChangeCrewSelected(+1)}/>
            </section>
          </div>
        </section>
        
        <section className={styles.projetos}>
          
          <div className={styles.leftcontainer}>
            <h1>Projetos</h1>
            <p>Conheça todos os projetos da equipe WolfByte</p>

            {crews[crewIndex].projects.map((project, idx) => {
              console.log("ProjectIndex : " + projectIndex)
              console.log("idx : " + idx)
              return (
                <ProjectCard 
                  id={projectIndex === idx && styles.active}
                  project={project}
                  key={project.id} 
                  onCLick={() => setProjectIndex(idx)}/>
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
          <img className={styles.topwave} src='/wave.svg'></img>
          <div className={styles.awards}>
            <h1>Prêmios</h1>
            <div className={styles.container}>
              <ProjectPrevArrow/>
              <div className={styles.placehold}>Carrossel safado</div>
              <ProjectNextArrow/>
            </div>
          </div>
          <img className={styles.bottomwave} src='/wave1.svg'></img>
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
