import { useState } from "react";
import Carousel from "react-multi-carousel";
import Modal from "../components/Modal/index";
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
  const projetos = props.projetos;

  return (
    <div key={projetos.id}>
      <div className={styles.card}>
        <img src={projetos.img} />
        <h2>{projetos.title}</h2>
        <button
          href={projetos.link}
          onClick={() => setShowModal(true)}
          className={styles.bt}
        >
          <p>Saiba Mais</p>
        </button>
      </div>
      <Modal onClose={() => setShowModal(false)} show={showModal}>
        <div className={styles.modal} key={projetos.id}>
          <div className={styles.projeto}>
            <h1>{projetos.title}</h1>
            <div className={styles.image}>
              <img src={projetos.src} />
            </div>

            <p>{projetos.description}</p>
          </div>

          {projetos.members.map((members) => (
            <div className={styles.membros}>
              <div className={styles.gridItem}>
                <table>
                  <tr>
                    <td>
                    <div className={styles.item}>
                      <img src={members.img} />
                    </div>
                    </td>
                    <td>
                    <div>
                      <p>
                        {members.name}
                        <br />
                        {members.cargo}
                      </p>
                    </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
