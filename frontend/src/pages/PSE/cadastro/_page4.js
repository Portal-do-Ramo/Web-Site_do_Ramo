import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { AiFillLock } from 'react-icons/ai';
import PSEFormHeader from '../../../components/PSEFormHeader';
import { PSEFormContext } from '../../../contexts/PSEFormContext';
import styles from '../../../styles/pseCadastro.module.scss';
import RadioInputPlusSelect from '../../../components/RadioInputPlusSelect';
import BasicSelect from '../../../components/BasicSelect';
import { toast } from 'react-toastify';

export default function Page4() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const {
    isFourthPageValidated
  } = useContext(PSEFormContext);

  const {
    pcd,
    setPcd,
    neuroatypicality,
    setNeuroatypicality,
    selfDeclaration,
    setSelfDeclaration,
    gender,
    setGender,
    handleSendCSV,

    buttonDisabled,
    setButtonDisabled
  } = useContext(PSEFormContext);

  const pcdList = [
    'Deficiência Motora',
    'Deficiência Auditiva',
    'Deficiência Intelectual',
    'Deficiência Múltipla',
    'Não sei',
    'Prefiro não dizer'
  ];
  const neuroList = [
    'Transtorno do Déficit de atenção com hiperatividade(TDAH)',
    'Transtorno do Déficit de Atenção',
    'Transtorno do Espectro Autirsta(TEA)',
    'Dislexia',
    'Outro'
  ];
  const selfDeclareList = [
    'Pessoa Branca',
    'Pessoa Amarela',
    'Pessoa Preta',
    'Pessoa Indígena',
    'Pessoa Parda',
    'Não sei',
    'Prefiro não dizer'
  ];

  const handleOptionChange = (event) => {
    setGender(event.target.value);
  };

    
  // Função que lida com o clique no botão "Próximo"
  function handleNext() {
    if (isFourthPageValidated) {
      // Todos os campos obrigatórios estão preenchidos, pode navegar para a próxima página
      setButtonDisabled(true);
      handleSendCSV();
      setError(false);
      router.push('/PSE/cadastro?page=5');
    } else {
      // Campos obrigatórios não preenchidos, exibe mensagem de erro
      setError(true);
      toast.error("Campo(s) obrigatório(s) incompleto(s)");
    }
  }

  return (
    <>
      <section className={styles.leftSide}>
        <PSEFormHeader page='4' />
        <article>
          <h1>Censo</h1>
          <div className={styles.containerTextos}>
            <p>
              Os dados coletados nesta parte do formulário serão utilizados no
              nosso censo para entendermos o público atingido pelo processo
              seletivo externo do IEEE e para possíveis adaptações nas futuras
              fases do nosso processo.
            </p>
            <p>
              Todas as suas respostas serão protegidas e não divulgadas, por
              isso pedimos honestidade na hora de responder as perguntas.
            </p>
            <p>
              <strong className={styles.observacao}>
                OBS: Essas perguntas não tem o objetivo NENHUM de classificar os
                candidatos, apenas pela coleta de informações para deixarmos a
                nossa extensão com um ambiente mais acolhedor e agradável.
              </strong>
            </p>
          </div>

          <div className={styles.message}>
            <AiFillLock />
            <p>
              Levamos as questões de privacidade a sério. Você pode ter certeza
              de que seus dados pessoais estão protegidos com segurança.
            </p>
          </div>

          <div className={styles.leftForm}>
            <div className={styles.genderRadios}>
              <h3>Gênero <strong>*</strong></h3>
              <div>
                <div>
                  <input
                    type='radio'
                    id='masculino'
                    value={'masculino'}
                    checked={gender === 'masculino'}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor='masculino'>Masculino</label>
                </div>
                <div>
                  <input
                    type='radio'
                    id='feminino'
                    value={'feminino'}
                    checked={gender === 'feminino'}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor='feminino'>Feminino</label>
                </div>
                <div>
                  <input
                    type='radio'
                    id='outro'
                    value={'outro'}
                    checked={gender === 'outro'}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor='outro'>Outro</label>
                </div>
              </div>
            </div>

            <div className={styles.Inputs}>
              <RadioInputPlusSelect
                label={<>Você é uma Pessoa com Deficiência(PcD)? <strong>*</strong></>} 
                defaultValue='Selecione uma opção'
                value={pcd}
                set={setPcd}
                list={pcdList}
              />
              <RadioInputPlusSelect
                label={<>Você apresenta alguma neuroatipicidade? <strong>*</strong></>}
                defaultValue='Selecione uma opção'
                value={neuroatypicality}
                set={setNeuroatypicality}
                list={neuroList}
              />
            </div>
            <BasicSelect
              label={<>Como você se autodeclara? <strong>*</strong></>}
              defaultValue='Selecione uma opção'
              list={selfDeclareList}
              value={selfDeclaration}
              set={setSelfDeclaration}
            />

            <div className={styles.buttonsHolder}>
              <button
                type='button'
                className={styles.back_page2}
                onClick={() => router.push('/PSE/cadastro?page=3')}
              >
                Voltar
              </button>

              <button
                type='button'
                className={styles.next_page2}
                onClick={handleNext}
                disabled={buttonDisabled}
              >
                Finalizar
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
