import styles from './CrewCard.module.scss';
import Link from 'next/link';

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
        </article>
      </Link>
    </section>
  );
}
