import styles from './FacaParteDaNossaEquipe.module.scss';
import { useRouter } from 'next/router';

export const FacaParteDaNossaEquipe = ({ havePSE }) => {
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
            alt='ilustração de uma equipe trabalhando junto'
          />
          {havePSE ? (
            <div>
              <span>Faça parte da nossa equipe!</span>
              <p>
                Se você é estudante de graduação do CEFET-RJ, se inscreva no
                nosso processo seletivo para trabalhar junto com o maior projeto
                de extensão do CEFET-RJ.{' '}
              </p>
              <button onClick={handlerButton}>Se inscreva já</button>
            </div>
          ) : (
            <div>
              <span>Faça parte da nossa equipe!</span>
              <p>
                O processo seletivo abrirá em breve, esperamos te ver por aqui
                novamente!
              </p>
              <button onClick={handlerButton} disabled>
                Em breve
              </button>
            </div>
          )}
        </article>
      </section>
    </>
  );
};
