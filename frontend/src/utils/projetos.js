import Carousel from "react-multi-carousel";

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
      <a href={projetos.link}>
        <p>Saiba Mais</p>
      </a>
    </div>
    ))}
    </Carousel>
    
    );
  
}
