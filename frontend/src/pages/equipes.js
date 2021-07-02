import Link from "next/link";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import Slider from "react-slick";

import "react-multi-carousel/lib/styles.css";
import styles from "../styles/equipes.module.scss";

import { Projetos } from "../utils/projetos";

import { useState } from "react";
import next from "next";

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

const projetos = [
  {
    id: 1,
    title: "IA/Bot",
    img: "/Robo.svg",
    link: "",
    src: "seu_pai.svg",
    description: "Projeto brabo",
    members: [
      {id: 1, name: "Julio", img:"Jogo.svg"},
      {id: 2, name: "Arthur", img:"Jogo.svg"},
      {id: 3, name: "Vinicius", img:"Jogo.svg"},
      {id: 4, name: "Thiago", img:"Jogo.svg"},
      {id: 5, name: "Gabriel", img:"Jogo.svg"},
    ]
  },
  {
    id: 2,
    title: "Jogos",
    img: "/Jogo.svg",
    link: "",
    src: "seu_pai.svg",
    description: "Projeto brabo",
    members: [
      {id: 1, name: "Julio", img:"Jogo.svg"},
      {id: 2, name: "Arthur", img:"Jogo.svg"},
      {id: 3, name: "Vinicius", img:"Jogo.svg"},
      {id: 4, name: "Thiago", img:"Jogo.svg"},
      {id: 5, name: "Gabriel", img:"Jogo.svg"},
    ]
  },
  {
    id: 3,
    title: "Site do Ramo",
    img: "/Tela.svg",
    link: "",
    src: "seu_pai.svg",
    description: "Projeto brabo",
    members: [
      {id: 1, name: "Julio", img:"Jogo.svg"},
      {id: 2, name: "Arthur", img:"Jogo.svg"},
      {id: 3, name: "Vinicius", img:"Jogo.svg"},
      {id: 4, name: "Thiago", img:"Jogo.svg"},
      {id: 5, name: "Gabriel", img:"Jogo.svg"},
    ]
  },
  {
    id: 4,
    title: "Console",
    img: "/Jogo.svg",
    link: "",
    src: "seu_pai.svg",
    description: "Projeto brabo",
    members: [
      {id: 1, name: "Julio", img:"Jogo.svg"},
      {id: 2, name: "Arthur", img:"Jogo.svg"},
      {id: 3, name: "Vinicius", img:"Jogo.svg"},
      {id: 4, name: "Thiago", img:"Jogo.svg"},
      {id: 5, name: "Gabriel", img:"Jogo.svg"},
    ]
      
    ,
  },
];

const equipes = [
  {
    id: 1,
    title: "Wolfbyte",
    img: "Wolfbyte_logo.svg",
    description: "Wolfbyte text",
  },
  {
    id: 2,
    title: "Wolfpower",
    img: "Wolfpower_logo.svg",
    description: "wolfpower text",
  },
  {
    id: 3,
    title: "Wolfbotz",
    img: "Wolfbotz_logo.svg",
    description: "Wolfbotz text",
  },
  { id: 4, title: "WIE", img: "WIE_logo.svg", description: "WIE text" },
  {
    id: 5,
    title: "Marketing",
    img: "Marketing_logo.svg",
    description: "Marketing text",
  },
];

export default function Equipes() {
  const [index, setIndex] = useState(0);
  
  function isEqual(idx, index) {
    if (idx == index) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className={styles.all}>
      <div className={styles.equipes}>
        <div className={styles.descrição}>
          <h1>WolfByte</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa
            tempor, eu aenean nisi, tortor. Tellus, posuere diam nunc ac ut
            iaculis. Pharetra odio id netus eu a, volutpat porttitor urna. Ac
            gravida in ac viverra nibh. Nulla lectus amet, vel mattis. Mauris,
            vel et massa netus sollicitudin ligula. Ipsum aliquam a, sed nisi,
            mauris eu risus ut. Ullamcorper libero, lectus eleifend tincidunt
            viverra adipiscing facilisis sed luctus. Odio sed elit, duis
            vulputate nunc arcu magna elit. Aliquet nulla nisl sed morbi lorem.
            Malesuada viverra consectetur pulvinar auctor. Consequat, quis est
            fermentum parturient proin tristique augue turpis. A amet, eleifend
            libero tincidunt at. Praesent vestibulum sollicitudin ultrices
            viverra.
            <br />
            At mauris in amet, vitae aliquam consectetur tortor. Aliquam
            ultricies purus elit, sem pharetra. Ornare netus tempor ornare dolor
            scelerisque. Viverra ultrices vitae, consequat in. Adipiscing et,
            nulla non faucibus metus consequat feugiat mollis faucibus. Commodo
            semper quam sed diam. Tortor urna neque, in nam nulla scelerisque in
            enim.
          </p>
        </div>
        <div className={styles.allcarousel}>
          <h2>Escolha sua equipe!</h2>

          <Carousel
            responsive={responsive}
            additionalTransfrom={0}
            arrows
            centerMode
            draggable
            infinite
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            responsive={responsive}
            showDots={false}
            slidesToSlide={1}
            swipeable
            afterChange={(current, next) => { setTimeout(() => setIndex(next), 10);}}
          >
            {equipes.map((equipes, idx) => (
              <div>
                <div
                  className={idx === index ? styles.atual : styles.sem}
                >
                  <img src={equipes.img} />
                </div>
                {idx === index ? <h2>{equipes.title}</h2> : null}
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <div className={styles.projetosatuais}>
        <h1>Projetos Atuais</h1>
        <Carousel
          responsive={responsive}
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
          {projetos.map((projetos) => (
            <Projetos projetos={projetos} />
          ))}
        </Carousel>
      </div>
      <div className={styles.projetosatuais}>
        <h1>Projetos Finalizados</h1>
        <Carousel
          responsive={responsive}
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
          {projetos.map((projetos) => (
            <Projetos projetos={projetos} />
          ))}
        </Carousel>
      </div>
      <div className={styles.premios}>
        <h1>Prêmios</h1>
        <img src="/Prem.svg" />
        <p>1º Lugar Exposup 2019</p>
        <img src="/Prem.svg" />
        <p>1º Lugar Exposup 2018</p>
      </div>
    </div>
  );
}
