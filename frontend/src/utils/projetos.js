import { useState } from "react";
import Carousel from "react-multi-carousel";
import Modal from "./modal";

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
  const projects = props.projetos;
  return(
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
    {projects.map((projetos) => (
    <div key={projetos.id}>
      <img src={projetos.img} />
      <h1>{projetos.title}</h1>
      <button href={projetos.link} onClick = {() => setShowModal(true)}>
        <p>Saiba Mais</p>
      </button>
      /*<Modal
      onClose={()=> setShowModal(false)}
      show={showModal}
      >
         <div>
            <img src={projetos.src} />
            <p>{projetos.description}</p>
          </div>
          <div>
            <p>{projetos.members}</p>
          </div>
      </Modal>*/
    </div>
    ))}
    </Carousel>
    
    );
  
}
