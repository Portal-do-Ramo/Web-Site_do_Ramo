import { useState } from "react";
import Carousel from "react-multi-carousel";
import Modal from "../components/Modal/Modal";
import styles from "./projetos.module.scss";

import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
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

export function Projetos(props) {
  const [showModal, setShowModal] = useState(false);
  const [actualId, setActualId] = useState("");
  const projetos = props.projetos;

  function isID(projetos) {
    return projetos.id == actualId;
  }
  function englobe(projects) {
    setActualId(projects.id);
    setShowModal(true);
  }

  return (
    <div key={projetos.id}>
      <img src={projetos.img} />
      <h1>{projetos.title}</h1>
      <button href={projetos.link} onClick={englobe}>
        <p>Saiba Mais</p>
      </button>
      <Modal onClose={() => setShowModal(false)} show={showModal}>
        <div className={styles.modal} key={projetos.id}>
          <div className={styles.projeto}>
            <h1>{projetos.title}</h1>
            <img src={projetos.src} />
            <p>{projetos.description}</p>
          </div>

          {projetos.members.map((members) => (
            <div className={styles.membros}>
              <div className={styles.gridItem}>
                <img src={members.img} />
                <p>{members.name}</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
