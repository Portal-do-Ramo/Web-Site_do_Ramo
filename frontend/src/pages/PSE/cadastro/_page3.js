import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { AiFillLock } from 'react-icons/ai';
import PSEFormHeader from '../../../components/PSEFormHeader';
import { PSEFormContext } from '../../../contexts/PSEFormContext';
import styles from '../../../styles/pseCadastro.module.scss';
import BasicSelect from '../../../components/BasicSelect';
import api from '../../../services/api';
import { toast } from 'react-toastify';

export default function Page3({ dynamicDates }) {
  const router = useRouter();
  const [error, setError] = useState(false);
  const {
    isThirdPageValidated
  } = useContext(PSEFormContext);

  const [equipesAtivas, setEquipesAtivas] = useState([]);

  const {
    crew,
    setCrew,
    area,
    setArea,
    availableDate,
    setAvailableDate,
    reason,
    setReason,
    experience,
    setExperience,
    HowFoundIeee,
    setHowFoundIeee
  } = useContext(PSEFormContext);

  //Controla a seleção de datas disponíveis para a dinâmica
  const handleCheckboxChange = (event, date) => {
    const checkedDates = availableDate.includes(date)
      ? availableDate.filter((d) => d !== date)
      : [...availableDate, date];

    setAvailableDate(checkedDates);
  };

  useEffect(() => {
    async function fetchEquipesAtivas() {
      try {
        const response = await api.get('/crews');
        setEquipesAtivas(response.data.map((equipes) => equipes.name));
      } catch (error) {
        console.error('Erro ao obter as equipes ativas:', error);
      }
    }

    fetchEquipesAtivas();
  }, []);

  const areaDasEquipes = {
    WolfByte: ['Programação', 'Arte e Som', 'Eletrônica', 'Mecânica'],
    RocketWolf: [
      'Propulsão',
      'Aerodinâmica',
      'Recuperação',
      'Estruturas',
      'Eletrônica'
    ],
    WolfPower: ['Eletrônica/Programação', 'Mecânica', 'Divulgação'],
    WolfBotz: ['Programação', 'Mecânica', 'Eletrônica'],
    WIE: ['Produtos', 'Mídias Sociais', 'Eventos', 'Projetos'],
    SocialWolf: ['Educacional', 'Mecânica', 'Programação', 'Eletrônica'],
    Marketing: ['Marketing'],
    Gestão: ['Assessoria de Gestão']
    
  };

  const [hideFieldArea, setHideFieldArea] = useState(true);
  const [previousCrew, setPreviewCrew] = useState('');

  useEffect(() => {
    if (
      crew === '' ||
      crew === 'marketing' ||
      crew === 'assessoria de gestão'
    ) {
      setHideFieldArea(true);
      setArea(areaDasEquipes[crew] ? areaDasEquipes[crew][0] : '');
    } else if (previousCrew === '') {
      setHideFieldArea(false);
    } else if (previousCrew !== '') {
      setHideFieldArea(false);
      setArea('');
    }

    setPreviewCrew(crew);
  }, [crew]);

  const arrayHowFoundIeee = [
    'Instagram',
    'WhatsApp',
    'LinkedIn',
    'Indicação de amigos',
    'Marketing de Sala',
    'Programa de Acolhimento ao Calouro (PAC)',
    'Estande do Ramo',
    'Outro'
  ];

   
  // Função que lida com o clique no botão "Próximo"
  function handleNext() {
    const validations = [
      {
        condition: crew.length >= 3,
        errorMessage: "Selecione uma equipe",
      },
      {
        condition: (area.length > 3),
        errorMessage: "Selecione uma área",
      },
      {
        condition: availableDate.length > 0,
        errorMessage: "Selecione pelo menos uma data disponível",
      },
      {
        condition: reason.length >= 1,
        errorMessage: "O campo 'Motivo' deve ser preenchido",
      },
      {
        condition: experience.length >= 1,
        errorMessage: "O campo 'Experiência' deve ser preenchido",
      },
      {
        condition: HowFoundIeee.length > 3,
        errorMessage:
          "Selecione uma opção em 'Como soube do nosso Processo Seletivo?'",
      },
    ];
  
    
    const invalidField = validations.find(({ condition }) => !condition);
  
    if (invalidField) {
    
      setError(true);
      toast.error(invalidField.errorMessage);
      return;
    }
  
   
    setError(false);
    router.push("/PSE/cadastro?page=4");
  }


  const [isSmallScreen, setIsSmallScreen] = useState(false);


  useEffect(() => {
    //Função para checar o tamanho da tela
    const checkScreenSize = () => {
      setIsSmallScreen(window.matchMedia("(max-width: 720px)").matches);
    };


    checkScreenSize();

    //listener para monitorar redimensionamentos
    window.addEventListener('resize', checkScreenSize);

   
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <>
      <section className={styles.leftSide}>
        <PSEFormHeader page='3' />

        <article>
          <h1>Interesse</h1>
          <p>Insira seus interesses pessoais no Ramo Estudantil IEEE.</p>

          <div className={styles.message}>
            <AiFillLock />
            <p>
              Levamos as questões de privacidade a sério. Você pode ter certeza
              de que seus dados pessoais estão protegidos com segurança.
            </p>
          </div>

          <div className={styles.leftForm}>
            <BasicSelect
              label={'Equipe'}
              required={true}
              value={crew}
              set={setCrew}
              defaultValue={'Selecione a equipe'}
              list={equipesAtivas}
            />
            {!hideFieldArea && (
              <BasicSelect
                label={'Área'}
                required={true}
                value={area}
                set={setArea}
                defaultValue={'Selecione a área'}
                list={areaDasEquipes[crew] ? areaDasEquipes[crew] : [`${crew}`]}
              />
            )}

            {dynamicDates && dynamicDates.length > 0 && (
              <>
                <span>
                  Datas que está disponível para dinâmica presencial <strong>*</strong>
                </span>
                <div className={styles.dynamicDate}>
                  {dynamicDates.map((dynamicDate, idx) => {
                    const formattedDate = isSmallScreen
                    ? dynamicDate.replace('-feira', '')
                    : dynamicDate;
                    return (
                    <div className={styles.dynamicDateItem} key={idx}>
                      <label htmlFor={`dynamicMainDate-${idx}`}>
                        {formattedDate}
                      </label>
                      <input
                        type='checkbox'
                        id={`dynamicMainDate-${idx}`}
                        value={dynamicDate}
                        checked={availableDate.includes(dynamicDate)}
                        onChange={(event) =>
                          handleCheckboxChange(event, dynamicDate)
                        }
                      />
                    </div>
                  );
})}
                </div>
              </>
            )}
          </div>
        </article>
      </section>

      <section className={styles.rightSide}>
        <article className={styles.rightForm}>
          <span>
            Por quais motivos gostaria de fazer parte do Ramo?{' '}
            <strong>*</strong>
          </span>
          <textarea
            placeholder='Escreva seus motivos'
            onChange={(event) => setReason(event.target.value)}
            value={reason}
          />
          <span>
            Você teve alguma experiência que pode agregar positivamente na sua
            trajetória dentro do ramo? <strong>*</strong>
          </span>
          <textarea
            placeholder='Escreva suas experiências'
            onChange={(event) => setExperience(event.target.value)}
            value={experience}
          />
          <BasicSelect
            label={'Como soube do nosso Processo Seletivo?'}
            required={true}
            value={HowFoundIeee}
            set={setHowFoundIeee}
            defaultValue={'Selecione como soube do Processo Seletivo'}
            list={arrayHowFoundIeee}
          />
          <div className={styles.buttonsHolder}>
            <button
              type='button'
              className={styles.cancel}
              onClick={() => router.push('/PSE/cadastro?page=2')}
            >
              Voltar
            </button>
            <button
              type='button'
              className={styles.next}
              onClick={handleNext}
            >
              Próximo
            </button>
          </div>
        </article>
      </section>
    </>
  );
}
