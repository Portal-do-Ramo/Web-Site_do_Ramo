import Link from "next/link";
import Image from "next/image";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import "react-multi-carousel/lib/styles.css";
import styles from "../styles/equipes.module.scss";

import { Projetos } from "../utils/projetos";

import { useState } from "react";



const projetos = [
  {
    id: 1,
    title: "IA/Bot",
    img: "/Robo.svg",
    link: "",
    src: "seu_pai.svg",
    description: "Projeto brabo",
    members: [
      { id: 1, name: "Julio", img: "Jogo.svg" },
      { id: 2, name: "Arthur", img: "Jogo.svg" },
      { id: 3, name: "Vinicius", img: "Jogo.svg" },
      { id: 4, name: "Thiago", img: "Jogo.svg" },
      { id: 5, name: "Gabriel", img: "Jogo.svg" },
    ],
  },
  {
    id: 2,
    title: "Jogos",
    img: "/Jogo.svg",
    link: "",
    src: "seu_pai.svg",
    description: "Projeto brabo",
    members: [
      { id: 1, name: "Julio", img: "Jogo.svg" },
      { id: 2, name: "Arthur", img: "Jogo.svg" },
      { id: 3, name: "Vinicius", img: "Jogo.svg" },
      { id: 4, name: "Thiago", img: "Jogo.svg" },
      { id: 5, name: "Gabriel", img: "Jogo.svg" },
    ],
  },
  {
    id: 3,
    title: "Site do Ramo",
    img: "/Tela.svg",
    link: "",
    src: "seu_pai.svg",
    description: "Projeto brabo",
    members: [
      { id: 1, name: "Julio", img: "Jogo.svg" },
      { id: 2, name: "Arthur", img: "Jogo.svg" },
      { id: 3, name: "Vinicius", img: "Jogo.svg" },
      { id: 4, name: "Thiago", img: "Jogo.svg" },
      { id: 5, name: "Gabriel", img: "Jogo.svg" },
    ],
  },
  {
    id: 4,
    title: "Console",
    img: "/Jogo.svg",
    link: "",
    src: "seu_pai.svg",
    description: "Projeto brabo",
    members: [
      { id: 1, name: "Julio", img: "Jogo.svg" },
      { id: 2, name: "Arthur", img: "Jogo.svg" },
      { id: 3, name: "Vinicius", img: "Jogo.svg" },
      { id: 4, name: "Thiago", img: "Jogo.svg" },
      { id: 5, name: "Gabriel", img: "Jogo.svg" },
    ],
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
  const NextArrow = ({ onClick }) => {
    return (
      <div className={styles.next} onClick={onClick} >
        <img src="/Vector (1).svg" />
      </div>
    );
  };
  const PNextArrow = ({ onClick }) => { //P..=Projeto
    return (
      <div className={styles.pnext} onClick={onClick}>
        <img src="/Arrow_EquipesRight.svg"/>
      </div>
    );
  };
  const PrevArrow = ({ onClick }) => {
    return (
      <div className={styles.prev} onClick={onClick}>
        <img src="/Vector (2).svg" />
      </div>
    );
  };
  const PPrevArrow = ({ onClick }) => {
    return (
      <div className={styles.pprev} onClick={onClick}>
        <img src="/Arrow_EquipesLeft.svg"/>
      </div>
    );
  };
  const [index, setIndex] = useState(0);
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
    infinite: true,
    centerMode:false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <PNextArrow />,
    prevArrow: <PPrevArrow />,
    
    className: styles.slider,
  };
  return (
    <div className={styles.all}>
      <div className={styles.equipes}>
        <div className={styles.descrição}>
          {equipes.map((equipes, idx) => (
            <div>
              {idx === index ? <h1>{equipes.title}</h1> : null}
              {idx === index ? <p>{equipes.description}</p> : null}
            </div>
          ))}
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
                  {idx === index ? <h2>{equipes.title}</h2> : null}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className={styles.projetosatuais}>
        <h1>Projetos Atuais</h1>
        <Slider {...psettings}>
          {projetos.map((projetos) => (
            <Projetos projetos={projetos} />
          ))}
        </Slider>
      </div>
      <div className={styles.projetosatuais}>
        <h1>Projetos Finalizados</h1>
        <Slider {...psettings}>
          {projetos.map((projetos) => (
            <Projetos projetos={projetos} />
          ))}
        </Slider>
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
