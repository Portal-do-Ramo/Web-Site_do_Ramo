import { useRouter } from 'next/router';

import Header from '../components/Header';
import Footer from '../components/Footer';

import {
  PrevArrow,
  NextArrow,
  ProjectNextArrow,
  ProjectPrevArrow,
  AwardPrevArrow,
  AwardNextArrow
} from '../components/Arrows';

import { useEffect, useState } from 'react';

import { ProjectCard } from '../components/ProjectCard';
import { ProjectDetail } from '../components/ProjectDetail';

import styles from '../styles/equipes.module.scss';

import api from '../services/api';
import Head from 'next/head';

export default function Equipes({ crews }) {
  const { query } = useRouter();
  const [crewIndex, setCrewIndex] = useState(0);
  const [projectIndex, setProjectIndex] = useState(0);
  const [awardTranslateX, setAwardTranslateX] = useState(0);
  const [projectsTranslateX, setProjectsTranslateX] = useState(0);

  const [dots, setDots] = useState([]);
  const [projectsDotSelected, setProjectsDotSelected] = useState(0);

  useEffect(() => {
    if (query.crewIndex) {
      setCrewIndex(parseInt(query.crewIndex));
    }
  }, [query]);

  useEffect(() => {
    if (
      process.browser &&
      document.getElementById(styles.awardsImagesContainer)
    ) {
      document.getElementById(styles.awardsImagesContainer).style.transform =
        `translateX(${awardTranslateX}px)`;
    }
  }, [awardTranslateX]);

  useEffect(() => {
    let dotsContainer = [];

    if (crews.length > 0 && crews[crewIndex].projects.length > 3) {
      let quantity = Math.trunc(crews[crewIndex].projects.length / 3);
      if (crews[crewIndex].projects.length % 3 !== 0) {
        quantity = quantity + 1;
      }

      while (quantity > 0) {
        dotsContainer.push(<span></span>);
        quantity--;
      }
    } else {
      dotsContainer.push(<span></span>);
    }

    setDots(dotsContainer);
  }, [crewIndex]);

  useEffect(() => {
    if (process.browser && document.querySelector('.' + styles.projectCard)) {
      let cardCardWidth = document.querySelector(
        '.' + styles.projectCard
      ).offsetWidth;
      let cardSliderGap = getComputedStyle(
        document.getElementById(styles.cardSlider)
      ).columnGap;
      cardSliderGap = cardSliderGap.replace('px', '');
      cardSliderGap = Number(cardSliderGap);

      document.getElementById(styles.cardSlider).style.transform =
        `translateX(${projectsTranslateX}px)`;

      if (-projectsTranslateX % ((cardCardWidth + cardSliderGap) * 3) === 0) {
        setProjectsDotSelected(
          -projectsTranslateX / ((cardCardWidth + cardSliderGap) * 3)
        );
      }
    }
  }, [projectsTranslateX]);

  function handleChangeCrewSelected(operation) {
    let imageContainerShift = document.querySelector(
      '.' + styles.currentProjectImage
    );
    imageContainerShift = getComputedStyle(imageContainerShift).right;
    imageContainerShift = imageContainerShift.replace('px', '');
    imageContainerShift = Number(imageContainerShift);

    setProjectIndex(0);
    setAwardTranslateX(0);

    if (operation === 1) {
      document.getElementById('currentProjectImage').style.transform =
        `translateX(-${imageContainerShift}px)`;
      document.getElementById('nextProjectImage').style.transform =
        `translateX(-${imageContainerShift}px)`;

      setTimeout(() => {
        document.getElementById('currentProjectImage').style.transition =
          'none';
        document.getElementById('nextProjectImage').style.transition = 'none';
        document.getElementById('currentProjectImage').style.transform =
          'translateX(0)';
        document.getElementById('nextProjectImage').style.transform =
          'translateX(0)';
        setCrewIndex(crewIndex + 1 === crews.length ? 0 : crewIndex + 1);
      }, 500);

      document.getElementById('currentProjectImage').style.transition =
        'transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)';
      document.getElementById('nextProjectImage').style.transition =
        'transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)';
    } else {
      document.getElementById('currentProjectImage').style.transform =
        `translateX(${imageContainerShift}px)`;
      document.getElementById('previousProjectImage').style.transform =
        `translateX(${imageContainerShift}px)`;

      setTimeout(() => {
        document.getElementById('currentProjectImage').style.transition =
          'none';
        document.getElementById('previousProjectImage').style.transition =
          'none';
        document.getElementById('currentProjectImage').style.transform =
          'translateX(0)';
        document.getElementById('previousProjectImage').style.transform =
          'translateX(0)';
        setCrewIndex(crewIndex - 1 === -1 ? crews.length - 1 : crewIndex - 1);
      }, 500);

      document.getElementById('currentProjectImage').style.transition =
        'transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)';
      document.getElementById('previousProjectImage').style.transition =
        'transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)';
    }
  }

  function handleChangeAwardSelected(operation) {
    let awardWidth = document.querySelector('.' + styles.award).offsetWidth;
    let awardGridGap = getComputedStyle(
      document.getElementById(styles.awardsImagesContainer)
    ).gap;
    awardGridGap = awardGridGap.replace('px', '');
    awardGridGap = Number(awardGridGap);

    if (
      crews.length > 0 &&
      operation === 1 &&
      awardTranslateX >
        -1 * (awardWidth + awardGridGap) * (crews[crewIndex].awards.length - 3)
    ) {
      setAwardTranslateX(awardTranslateX - (awardWidth + awardGridGap));
    } else if (operation === -1 && awardTranslateX < 0) {
      setAwardTranslateX(awardTranslateX + (awardWidth + awardGridGap));
    }
  }

  function handleChangeProjectsSelected(operation) {
    let cardCardWidth = document.querySelector(
      '.' + styles.projectCard
    ).offsetWidth;
    let cardSliderGap = getComputedStyle(
      document.getElementById(styles.cardSlider)
    ).columnGap;
    cardSliderGap = cardSliderGap.replace('px', '');
    cardSliderGap = Number(cardSliderGap);

    if (
      crews.length > 0 &&
      operation === 1 &&
      projectsTranslateX >
        -1 *
          (cardCardWidth + cardSliderGap) *
          (crews[crewIndex].projects.length - 3)
    ) {
      setProjectsTranslateX(
        projectsTranslateX - (cardCardWidth + cardSliderGap) * 3
      );
    } else if (
      operation === -1 &&
      projectsTranslateX < 0 &&
      projectsTranslateX + cardCardWidth + cardSliderGap <= 0
    ) {
      setProjectsTranslateX(
        projectsTranslateX + (cardCardWidth + cardSliderGap) * 3
      );
    }
  }

  function verifyIsAwardArrowDisabled() {
    if (process.browser && document.querySelector('.' + styles.award)) {
      let awardWidth = document.querySelector('.' + styles.award).offsetWidth;
      let awardGridGap = getComputedStyle(
        document.getElementById(styles.awardsImagesContainer)
      ).gap;
      awardGridGap = awardGridGap.replace('px', '');
      awardGridGap = Number(awardGridGap);

      if (
        crews.length > 0 &&
        crews[crewIndex].awards.length !== 0 &&
        awardTranslateX >
          -1 *
            (awardWidth + awardGridGap) *
            (crews[crewIndex].awards.length - 3)
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  return (
    <>
      <Head>
        <title>Equipes | IEEE CEFET-RJ</title>
      </Head>

      <Header page='equipes' />

      <div className={styles.all}>
        {crews.length ? (
          <>
            <section className={styles.presentation}>
              <div className={styles.carouselContainer}>
                <h2>Escolha sua equipe!</h2>

                <section className={styles.carousel}>
                  <PrevArrow onClick={() => handleChangeCrewSelected(-1)} />

                  <article className={styles.crewSelected}>
                    <div className={styles.imagesCarouselContainer}>
                      {crewIndex === 0 ? (
                        <img
                          src={crews[crews.length - 1].crew.imageURL}
                          className={styles.previousProjectImage}
                          id='previousProjectImage'
                        />
                      ) : (
                        <img
                          src={crews[crewIndex - 1].crew.imageURL}
                          className={styles.previousProjectImage}
                          id='previousProjectImage'
                        />
                      )}

                      <img
                        src={crews[crewIndex].crew.imageURL}
                        className={styles.currentProjectImage}
                        id='currentProjectImage'
                      />

                      {crewIndex === crews.length - 1 ? (
                        <img
                          src={crews[0].crew.imageURL}
                          className={styles.nextProjectImage}
                          id='nextProjectImage'
                        />
                      ) : (
                        <img
                          src={crews[crewIndex + 1].crew.imageURL}
                          className={styles.nextProjectImage}
                          id='nextProjectImage'
                        />
                      )}
                    </div>

                    <p> {crews[crewIndex].crew.name} </p>
                  </article>

                  <NextArrow onClick={() => handleChangeCrewSelected(+1)} />
                </section>
              </div>

              <div className={styles.description}>
                <h1>{crews[crewIndex].crew.name}</h1>

                {crews[crewIndex].crew.about
                  .split(/\r?\n/g)
                  .map((info, idx) => {
                    if (info !== '') {
                      return (
                        <>
                          <p key={idx}>{info}</p>
                          <br />
                        </>
                      );
                    }
                  })}
              </div>
            </section>

            {crews[crewIndex].projects.length !== 0 && (
              <section className={styles.projects}>
                <div className={styles.leftContainer}>
                  <h2>Projetos</h2>
                  <p>
                    Conheça todos os projetos da equipe{' '}
                    {crews[crewIndex].crew.name}
                  </p>
                  <div className={styles.sliderHolder}>
                    <ProjectPrevArrow
                      onClick={() => handleChangeProjectsSelected(-1)}
                      disabled={projectsTranslateX === 0}
                    />

                    <section className={styles.projectSliderContainer}>
                      <div id={styles.cardSlider}>
                        {crews[crewIndex].projects.map((project, idx) => {
                          return (
                            <div className={styles.projectCard} key={idx}>
                              <ProjectCard
                                project={project}
                                active={projectIndex === idx}
                                key={idx}
                                onCLick={() => setProjectIndex(idx)}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </section>
                    <ProjectNextArrow
                      onClick={() => handleChangeProjectsSelected(+1)}
                      disabled={projectsDotSelected === dots.length - 1}
                    />
                  </div>

                  <div className={styles.dots}>
                    {dots.map((dot, idx) => {
                      return (
                        <span
                          className={
                            projectsDotSelected === idx
                              ? styles.dotSelected
                              : ''
                          }
                          key={idx}
                        ></span>
                      );
                    })}
                  </div>
                </div>

                <div className={styles.rightContainer}>
                  <ProjectDetail
                    project={crews[crewIndex].projects[projectIndex]}
                  />
                </div>
              </section>
            )}

            {crews[crewIndex].awards.length !== 0 && (
              <section className={styles.awards_section}>
                <img className={styles.topWave} src='/Background.png'></img>
                <div className={styles.awards}>
                  <h2>Prêmios</h2>

                  <div className={styles.awardSlider}>
                    <AwardPrevArrow
                      onClick={() => handleChangeAwardSelected(-1)}
                      disabled={awardTranslateX === 0}
                    />

                    <section className={styles.awardsContainer}>
                      <div id={styles.awardsImagesContainer}>
                        {crews[crewIndex].awards.map((award, idx) => {
                          return (
                            <article className={styles.award} key={idx}>
                              <img src='award.svg' alt='Prêmio imagem' />
                              <strong>{award.placing}</strong>
                              <span>{award.name}</span>
                              <p>{award.year && award.year}</p>
                            </article>
                          );
                        })}
                      </div>
                    </section>

                    <AwardNextArrow
                      onClick={() => handleChangeAwardSelected(1)}
                      disabled={verifyIsAwardArrowDisabled()}
                    />
                  </div>
                </div>
                <img className={styles.bottomWave} src='/Background.png'></img>
              </section>
            )}
          </>
        ) : (
          <></>
        )}
      </div>

      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  let { data: crewsAllData } = await api.get('/crewsAllData');

  return {
    props: {
      crews: crewsAllData
    },
    revalidate: 30 // 30 seg
  };
};
