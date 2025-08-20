import styles from './CrewCard.module.scss';
import Link from 'next/link';

const chapter = {
  RocketWolf:"Aerospace & Electronic Systems Society",
}

//Componente de cartão da equipe que exibe uma imagem e um nome e redireciona para a página /equipes + index quando clicado
export default function Card({ index, image, name }) {
  return (
    <section className={name === 'WIE' ? styles.wieCard : styles.cards}>
      <Link
        href={{
          pathname: '/equipes',
          query: { crewIndex: index }
        }}
      >
        <article>
          <img src={image} />
          <p>{name}</p>
          <p className={styles.chapter}>{chapter[name]}</p>
        </article>
      </Link>
    </section>
  );
}
