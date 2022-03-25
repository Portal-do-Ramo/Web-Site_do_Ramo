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

  function handleChangeCrewSelected(index) {
    if (index === -1) {
      setCrewIndex(crews.length - 1);
      setProjectIndex(0);
    } else if (index === crews.length) {
      setCrewIndex(0);
      setProjectIndex(0);
    } else {
      setCrewIndex(index);
      setProjectIndex(0);
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
              <PrevArrow onClick={() => handleChangeCrewSelected(crewIndex - 1)}/>
              
              <article className={styles.crewSelected}>

                <div>
                  { crewIndex === 0
                    ? <img src={crews[crews.length - 1].image} className={styles.previusImage}/>
                    : <img src={crews[crewIndex - 1].image} className={styles.previusImage}/>
                  }
                  
                  <img src={crews[crewIndex].image} />

                  { crewIndex === crews.lengh - 1
                    ? <img src={crews[0].image} className={styles.previusImage}/>
                    : <img src={crews[crewIndex + 1].image} className={styles.previusImage}/>
                  }
                </div>
                

                <p> {crews[crewIndex].name} </p>
              </article>

              <NextArrow onClick={() => handleChangeCrewSelected(crewIndex + 1)}/>
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
        
        <div className={styles.premiosGeral}>

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
