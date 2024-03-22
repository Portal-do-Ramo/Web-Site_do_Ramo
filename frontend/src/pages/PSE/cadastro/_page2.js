import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AiFillLock } from 'react-icons/ai';
import PSEFormHeader from '../../../components/PSEFormHeader';
import { PSEFormContext } from '../../../contexts/PSEFormContext';
import styles from '../../../styles/pseCadastro.module.scss';
import BasicInput from '../../../components/BasicInput';
import BasicSelect from '../../../components/BasicSelect';

export default function Page2() {
  const router = useRouter();

  const {
    register,
    setRegister,
    course,
    setCourse,
    currentPeriod,
    setCurrentPeriod
  } = useContext(PSEFormContext);

  const periods = [
    '1º período',
    '2º período',
    '3º período',
    '4º período',
    '5º período',
    '6º período',
    '7º período',
    '8º período',
    '9º período',
    '10º período',
    'Não sei definir'
  ];

  const courses = [
    'Bacharelado em Administração',
    'Bacharelado em Ciência da Computação',
    'Bacharelado em Sistema de Informação',
    'Bacharelado em Engenharia Ambiental',
    'Bacharelado em Engenharia Civil',
    'Bacharelado em Engenharia de Controle e Automação',
    'Bacharelado em Engenharia de Produção',
    'Bacharelado em Engenharia de Telecomunicações',
    'Bacharelado em Engenharia Elétrica',
    'Bacharelado em Engenharia Eletrônica',
    'Bacharelado em Engenharia Mecânica',
    'Bacharelado em Física',
    'Bacharelado em Línguas Estrangeiras Aplicadas às Negociações Internacionais',
    'Curso Superior de Tecnologia em Gestão Ambiental',
    'Curso Superior de Tecnologia em Sistemas para Internet'
  ];

  return (
    <>
      <section className={styles.leftSide}>
        <PSEFormHeader page='2' />

        <article>
          <h1>Dados da Matrícula</h1>
          <p>Insira seus dados acadêmicos.</p>

          <div className={styles.message}>
            <AiFillLock />
            <p>
              Levamos as questões de privacidade a sério. Você pode ter certeza
              de que seus dados pessoais estão protegidos com segurança.
            </p>
          </div>

          <div className={styles.leftForm}>
            <BasicInput
              label='Matrícula'
              id='register'
              type='text'
              placeholder='Digite o número da Matrícula'
              required={true}
              value={register}
              set={setRegister}
            />
            <BasicSelect
              label={'Curso'}
              required={true}
              value={course}
              set={setCourse}
              defaultValue={'Selecione seu curso'}
              list={courses}
            />
            <BasicSelect
              label={'Período atual'}
              required={true}
              value={currentPeriod}
              set={setCurrentPeriod}
              defaultValue={'Selecione seu período'}
              list={periods}
            />

            <div className={styles.buttonsHolder}>
              <button
                type='button'
                className={styles.back_page2}
                onClick={() => router.push('/PSE/cadastro?page=1')}
              >
                Voltar
              </button>

              <button
                type='button'
                className={styles.next_page2}
                onClick={() => router.push('/PSE/cadastro?page=3')}
              >
                Próximo
              </button>
            </div>
          </div>
        </article>
      </section>

      <section className={styles.rightSide}>
        <article className={styles.rightForm_page2}></article>
      </section>
    </>
  );
}
