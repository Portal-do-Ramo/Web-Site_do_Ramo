import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { FacaParteDaNossaEquipe } from '../components/FacaParteDaNossaEquipe';
import CrewsCard from '../components/CrewsCard';
import Image from 'next/image';
import Head from 'next/head';
import api from '../services/api';

import styles from '../styles/index.module.scss';

export default function Home({ crews }) {
  return (
    <>
      <Head>
        <title>Início | IEEE CEFET-RJ</title>
      </Head>
      <div className={styles.container}>
      <Header page='inicio'>
        <div className={styles.wolfImageContainer}>
          <Image
            src='/seu_pai2.svg'
            alt='Lobo do Ramo IEEE CEFET-RJ'
            width={300}
            height={300}
          />
        </div>
      </Header>

      <div className={styles.page_container}>
        <section className={styles.text_container}>
          <article className={styles.ourStory}>
            <h1>Nossa História</h1>

            <p>
              O Ramo Estudantil IEEE teve um início humilde em 2004, mas voltou
              mais forte em 2016, desde então crescendo passo a passo. Começou
              focado somente na parte de programação computacional, mas conforme
              o tempo expandiu as áreas de atuação, criando equipes para cada
              uma dessas áreas.
              <br />
              <br />
              Buscamos auxiliar no crescimento das pessoas tanto como
              profissional como quanto pessoa, com projetos em equipe que
              aceitam qualquer nível de experiência, desde que esteja disposto/a
              a aprender.
            </p>
          </article>

          <article className={styles.main_container}>
            <a href='/sobre' className={styles.button}>
              <p>Saiba mais</p>
              <Image src='/right-arrow.svg' width={20} height={20} />
            </a>
          </article>
        </section>

        <section className={styles.sponsors}>
          <Swiper
            slidesPerView='auto'
            spaceBetween={40}
            freeMode={true}
            loop={true}
            allowTouchMove={true}
            speed={2500}
            centeredSlides={true}
            autoplay={{
              delay: 5,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            modules={[FreeMode, Autoplay]}
            className={styles.swiper}
          >
            <SwiperSlide className={styles.swiper_slide}>
              {' '}
              <img src='/sponsor_botz.svg' alt='botz logo' />{' '}
            </SwiperSlide>
            <SwiperSlide className={styles.swiper_slide}>
              {' '}
              <img src='/sponsor_motin.svg' alt='motin logo' />{' '}
            </SwiperSlide>
            <SwiperSlide className={styles.swiper_slide}>
              {' '}
              <img src='/sponsor_polozulu.svg' alt='polozulu logo' />{' '}
            </SwiperSlide>
            <SwiperSlide className={styles.swiper_slide}>
              {' '}
              <img
                src='/sponsor_squair.svg'
                alt='squair logo'
                id={styles.squair_logo}
              />{' '}
            </SwiperSlide>
            <SwiperSlide className={styles.swiper_slide}>
              {' '}
              <img src='/sponsor_tecci.svg' alt='tecci logo' />{' '}
            </SwiperSlide>
            <SwiperSlide className={styles.swiper_slide}>
              {' '}
              <img
                src='/sponsor_universinagem.svg'
                alt='universinagem logo'
              />{' '}
            </SwiperSlide>
            <SwiperSlide className={styles.swiper_slide}>
              {' '}
              <img src='/sponsor_voitto.svg' alt='voitto logo' />{' '}
            </SwiperSlide>
          </Swiper>
        </section>

        <section className={styles.crew_content}>
          <article>
            <h3>Equipes</h3>

            <div className={styles.logo_content}>
              {crews.map((crew, index) => {
                return (
                  <CrewsCard
                    key={crew.id}
                    index={index}
                    name={crew.name}
                    image={crew.imageURL}
                  />
                );
              })}
            </div>
          </article>
        </section>
        <FacaParteDaNossaEquipe />
      </div>
      <Footer />
    </div>
    </>
    
  );
}

//Busca informações sobre as equipes e se o pse está ocorrendo
export const getStaticProps = async () => {
  let { data: crews } = await api.get('/crews');

  return {
    props: {
      crews,
    },
    revalidate: 60 * 60 * 4 // 4 Horas
  };
};
