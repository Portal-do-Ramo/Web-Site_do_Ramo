import styles from './FacaParteDaNossaEquipe.module.scss';
import { useRouter } from 'next/router';

//Componente de convite para processo seletivo
export const FacaParteDaNossaEquipe = ( ) => {
  const router = useRouter();

  const handlerButton = () => {
    router.push('/PSE');
  };

  return (
    <>
      <section className={styles.join_us}>
        <article>
          <img
            src='/pessoas_quebra_cabeca.svg'
            alt='Ilustração de uma equipe trabalhando junto'
          />
          <div>
            <span>Faça parte da nossa equipe!</span>
            <p>
              Se você é estudante de graduação do CEFET-RJ, inscreva-se no nosso
              processo seletivo para trabalhar junto com o maior projeto de
              extensão da instituição.{' '}
            </p>
            <button onClick={handlerButton}>Saiba mais</button>
          </div>
        </article>
      </section>
    </>
  );
};
