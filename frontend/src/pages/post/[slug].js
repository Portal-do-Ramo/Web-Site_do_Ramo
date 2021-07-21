import { useRouter } from "next/router";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from "./styles.module.scss";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import NewsBox from "../../components/NewsBox/NewsBox";

const noticias = [
  {
    id: 1,
    img: "/botz1 1.svg",
    title: "Fliper ",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    time: 20000,
    publishedAt: "2021-07-11T12:00:56Z",
    writer: "Xande",
    shootby: "Pericles",
  },
  {
    id: 2,
    img: "/botz2.svg",
    title: " do Ramo",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    time: 20000,
    publishedAt: "2021-06-21T12:00:56Z",
    writer: "Xande",
    shootby: "Pericles",
  },
  {
    id: 3,
    img: "/botz2.svg",
    title: " Ramo",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    time: 20000,
    publishedAt: "2021-04-21T12:00:56Z",
    writer: "Xande",
    shootby: "Pericles",
  },
  {
    id: 4,
    img: "/botz1 1.svg",
    title: "Fiz um aplicativo pro ramo e olha no que deu",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    time: 20000,
    publishedAt: "2021-07-19T12:00:56Z",
    writer: "Xande",
    shootby: "Pericles",
  },
  {
    id: 5,
    img: "/botz1 1.svg",
    title: "Bute",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    time: 2000,
    publishedAt: "2021-07-11T12:00:56Z",
    writer: "Xande",
    shootby: "Pericles",
  },
  {
    id: 6,
    img: "/botz1 1.svg",
    title: "Bot",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    time: 2000,
    publishedAt: "2021-07-20T12:00:56Z",
    writer: "Xande",
    shootby: "Pericles",
  },
  {
    id: 7,
    img: "/botz1 1.svg",
    title: "Sla",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    time: 20000,
    publishedAt: "2021-07-20T12:00:56Z",
    writer: "Xande",
    shootby: "Pericles",
  },
  {
    id: 8,
    img: "/botz1 1.svg",
    title: "VemVemVem",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    time: 2000,
    publishedAt: "2021-04-21T12:00:56Z",
    writer: "Xande",
    shootby: "Pericles",
  },
  {
    id: 9,
    img: "/botz1 1.svg",
    title: "9",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    time: 2,
    publishedAt: "2021-07-20T12:00:56Z",
    writer: "Xande",
    shootby: "Pericles",
  },
  {
    id: 10,
    img: "/botz1 1.svg",
    title: "10",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    time: 2,
    publishedAt: "2021-07-20T12:00:56Z",
    writer: "Xande",
    shootby: "Pericles",
  },
  {
    id: 11,
    img: "/botz1 1.svg",
    title: "11",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    time: 2,
    publishedAt: "2021-04-21T12:00:56Z",
    writer: "Xande",
    shootby: "Pericles",
  },
  {
    id: 12,
    img: "/botz1 1.svg",
    title: "12",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    time: 2,
    publishedAt: "2021-07-20T12:00:56Z",
    writer: "Xande",
    shootby: "Pericles",
  },
  {
    id: 13,
    img: "/botz1 1.svg",
    title: "13",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    time: 2,
    publishedAt: "2021-04-21T12:00:56Z",
    writer: "Xande",
    shootby: "Pericles",
  },
  {
    id: 14,
    img: "/botz1 1.svg",
    title: "V14",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    time: 2,
    publishedAt: "2021-04-21T12:00:56Z",
    writer: "Xande",
    shootby: "Pericles",
  },
  {
    id: 15,
    img: "/botz1 1.svg",
    title: "15",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    time: 2,
    publishedAt: "2021-04-21T12:00:56Z",
    writer: "Xande",
    shootby: "Pericles",
  },
  {
    id: 16,
    img: "/botz1 1.svg",
    title: "16",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    time: 2,
    publishedAt: "2021-04-21T12:00:56Z",
    writer: "Xande",
    shootby: "Pericles",
  },
  {
    id: 17,
    img: "/botz1 1.svg",
    title: "17",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    time: 2,
    publishedAt: "2021-04-21T12:00:56Z",
    writer: "Xande",
    shootby: "Pericles",
  },
];

export default function Noticia() {
  const router = useRouter();
  const actual = router.query.slug - 1;

  function randomExcluded(max, excluded) {
    var n = Math.floor(Math.random() * max);
    if (n == excluded) n++;
    return n;
  }

  const random1 = randomExcluded(noticias.length, actual);
  const random2 = randomExcluded(noticias.length, actual);

  

  return (
    <div>
      <Header />

      <div className={styles.all}>
        <h1> Jornal do Ramo </h1>
        {noticias.map((noticias, idx) => (
          <div key={noticias.id}>
            {idx == actual ? (
              <div>
                <div className={styles.mainNews}>
                  <h1>{noticias.title}</h1>
                  <p className={styles.writer}>
                    {format(parseISO(noticias.publishedAt), "dd/MM/yy", {
                      locale: ptBR,
                    })}{" "}
                    - Escrito por {noticias.writer}
                  </p>

                  <Image
                    src={noticias.img}
                    width={1170}
                    height={500}
                    objectFit="cover"
                    className={styles.image}
                  />

                  <p className={styles.shoot}>Foto por {noticias.shootby}</p>
                  <p>{noticias.description}</p>
                </div>
              </div>
            ) : null}
          </div>
        ))}
        <h3> Veja também </h3>
        <div className={styles.randomNewsContainer}>
          {noticias.map((noticias, idx) => (
            <div key={noticias.id}>
              {(idx == random1 || idx == random2) ? (
                <NewsBox noticias={noticias} />
              ) : null}
            </div>
          ))}
        </div>
        <div className={styles.socialMedia}>
          <a target="_blank" href="https://pt-br.facebook.com/ramocefet/">
            <img src="/FacebookBlue.svg" />
          </a>
          <a target="_blank" href="https://www.instagram.com/ramocefet/">
            <img src="/InstagramBlue.svg" />
          </a>
          <a target="_blank" href="https://www.linkedin.com/company/ramocefet/">
            <img src="/LinkedinBlue.svg" />
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
