import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { AiFillLock, AiFillWarning } from 'react-icons/ai';
import PSEFormHeader from '../../../components/PSEFormHeader';
import { PSEFormContext } from '../../../contexts/PSEFormContext';
import styles from '../../../styles/pseCadastro.module.scss';
import BasicInput from '../../../components/BasicInput';
import { toast } from 'react-toastify';

export default function Page1() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const {
    isFistPageValidated
  } = useContext(PSEFormContext);

  const {
    fullname,
    setFullName,
    phone,
    setPhone,
    email,
    setEmail,
    linkedin,
    setLinkedin,
    instagram,
    setInstagram,
    birthday,
    setBirthday,
    clearAll
  } = useContext(PSEFormContext);

  const listFormRegistro = [
    {
      label: 'Nome Completo',
      id: 'name',
      type: 'text',
      placeholder: 'Digite seu nome',
      required: true,
      value: fullname,
      set: setFullName
    },
    {
      label: 'Data de Nascimento',
      id: 'nascimento',
      type: 'date',
      placeholder: 'DD/MM/AAAA',
      required: true,
      value: birthday,
      set: setBirthday,
      mask: '00/00/0000'
    },
    {
      label: 'Telefone',
      id: 'telefone',
      type: 'text',
      placeholder: '(21) 9xxxx-xxxx',
      required: true,
      value: phone,
      set: setPhone,
      mask: '(00) 00000-0000'
    },
    {
      label: 'E-mail',
      id: 'email',
      type: 'text',
      placeholder: 'Digite seu email',
      required: true,
      value: email,
      set: setEmail
    }
  ];

  const listSocialMedia = [
    {
      label: null,
      id: 'linkedin',
      type: 'text',
      placeholder: 'Linkedin',
      required: false,
      value: linkedin,
      set: setLinkedin
    },
    {
      label: null,
      id: 'instagram',
      type: 'text',
      placeholder: 'Instagram',
      required: false,
      value: instagram,
      set: setInstagram
    }
  ];

  

  // Função que lida com o clique no botão "Próximo"
  function handleNext() {
    const validations = [
      {
        field: fullname,
        condition: (value) => value.length > 3,
        errorMessage: "O nome completo deve ter mais de 3 caracteres",
      },
      {
        field: birthday,
        condition: (value) => value.length === 10,
        errorMessage: "A data de nascimento deve estar no formato DD/MM/AAAA",
      },
      {
        field: phone,
        condition: (value) => value.length > 9,
        errorMessage: "O telefone deve ter ao menos 10 dígitos",
      },
      {
        field: email,
        condition: (value) => value.length > 3 &&  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        errorMessage: "O email deve ser válido (exemplo: usuario@email.com)",
      },
    ];
  
    
    const invalidField = validations.find(
      ({ field, condition }) => !condition(field)
    );
  
    if (invalidField) {
      toast.error(invalidField.errorMessage);
      return;
    }
  
    // Tudo ok, avança para a próxima página
    router.push("/PSE/cadastro?page=2");
  }

  function handleCancel() {
    clearAll();
    router.push('/PSE');
  }

  return (
    <>
      <section className={styles.leftSide}>
        <PSEFormHeader page='1' />

        <article>
          <h1>Registro</h1>
          <p>Insira suas informações pessoais.</p>
          <br></br>
          <p><AiFillWarning /> Antes de prosseguir, recomendamos a leitura do <a href='https://drive.google.com/file/d/1tUAWfGk4E88ox5vDUXRj48OL4wonz1xm/view?usp=sharing'>Edital do Candidato</a>.</p>

          <div className={styles.message}>
            <AiFillLock />
            <p>
              Levamos as questões de privacidade a sério. Você pode ter certeza
              de que seus dados pessoais estão protegidos com segurança.
            </p>
          </div>

          <div className={styles.leftForm}>
            {listFormRegistro.map((item) => {
              return (
                <BasicInput
                  key={item.id}
                  label={item.label}
                  id={item.id}
                  type={item.type}
                  placeholder={item.placeholder}
                  required={item.required}
                  value={item.value}
                  set={item.set}
                  mask={item.mask ? item.mask : null}
                />
              );
            })}
          </div>
        </article>
      </section>

      <section className={styles.rightSide}>
        <article className={styles.rightForm}>
          <span>Redes Sociais</span>
          {listSocialMedia.map((item) => {
            return (
              <BasicInput
                key={item.id}
                label={item.label}
                id={item.id}
                type={item.type}
                placeholder={item.placeholder}
                required={item.required}
                value={item.value}
                set={item.set}
              />
            );
          })}
          <div className={styles.buttonsHolder}>
            <button
              type='button'
              className={styles.cancel}
              onClick={handleCancel}
            >
              Cancelar
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
