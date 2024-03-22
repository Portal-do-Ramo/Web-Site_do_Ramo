import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AiFillLock } from 'react-icons/ai';
import PSEFormHeader from '../../../components/PSEFormHeader';
import { PSEFormContext } from '../../../contexts/PSEFormContext';
import styles from '../../../styles/pseCadastro.module.scss';
import BasicInput from '../../../components/BasicInput';

export default function Page1() {
  const router = useRouter();

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
              onClick={() => router.push('/PSE/cadastro?page=2')}
            >
              Próximo
            </button>
          </div>
        </article>
      </section>
    </>
  );
}
