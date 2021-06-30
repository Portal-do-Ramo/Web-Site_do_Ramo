import Link from "next/link";
import Image from "next/image";
import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";
import styles from "../styles/equipes.module.scss";

import { Projetos } from "../utils/projetos";

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

const projetos= [
  {id: 1,title: 'IA/Bot', img:"/Robo.svg", link:"" },
  {id: 2,title: 'Jogos', img:"/Jogo.svg", link:"" },
  {id: 3,title: 'Site do Ramo', img:"/Tela.svg", link:"" },
  {id: 4,title: 'Console', img:"/Jogo.svg", link:"" },
]

export default function Equipes() {
  return (
    <>
      <div className={styles.descrição}>
        <h1>WolfByte</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa tempor,
          eu aenean nisi, tortor. Tellus, posuere diam nunc ac ut iaculis.
          Pharetra odio id netus eu a, volutpat porttitor urna. Ac gravida in ac
          viverra nibh. Nulla lectus amet, vel mattis. Mauris, vel et massa
          netus sollicitudin ligula. Ipsum aliquam a, sed nisi, mauris eu risus
          ut. Ullamcorper libero, lectus eleifend tincidunt viverra adipiscing
          facilisis sed luctus. Odio sed elit, duis vulputate nunc arcu magna
          elit. Aliquet nulla nisl sed morbi lorem. Malesuada viverra
          consectetur pulvinar auctor. Consequat, quis est fermentum parturient
          proin tristique augue turpis. A amet, eleifend libero tincidunt at.
          Praesent vestibulum sollicitudin ultrices viverra.
          <br />
          At mauris in amet, vitae aliquam consectetur tortor. Aliquam ultricies
          purus elit, sem pharetra. Ornare netus tempor ornare dolor
          scelerisque. Viverra ultrices vitae, consequat in. Adipiscing et,
          nulla non faucibus metus consequat feugiat mollis faucibus. Commodo
          semper quam sed diam. Tortor urna neque, in nam nulla scelerisque in
          enim.
        </p>
        <div className={styles.allcarousel}>
          <h2>Escolha sua equipe!</h2>
          <Carousel
            responsive={responsive}
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
                <img src="/Marketing_logo.svg" />
              </a>
            </div>
            <div>
              <a>
                <img src="/Socialwolf_logo.svg" />
              </a>
            </div>
            <div>
              <a>
                <img src="/Rocketwolf_logo.svg" />
              </a>
            </div>
            <div>
              <a>
                <img src="/Wolfbotz_logo.svg" />
              </a>
            </div>
            <div>
              <a>
                <img src="/Wolfpower_logo.svg" />
              </a>
            </div>
            <div>
              <a>
                <img src="/Wolfbyte_logo.svg" />
              </a>
            </div>
            <div>
              <a>
                <img src="/WIE_logo.svg" />
              </a>
            </div>
          </Carousel>
          <h2>WOLFBYTE</h2>
        </div>
        <div className={styles.projetosatuais}>
          <h1>Projetos Atuais</h1>
          <Projetos projetos={projetos}/>
        </div>
        <div className={styles.projetosatuais}>
          <h1>Projetos Finalizados</h1>
          <Projetos projetos={projetos}/>
        </div>
        <div className={styles.premios}>
          <h1>Prêmios</h1>
          <img src="/Prem.svg"/>
          <p>1º Lugar Exposup 2019</p>
          <img src="/Prem.svg"/>
          <p>1º Lugar Exposup 2018</p>
        </div>

        </div>
    </>
  );
}
