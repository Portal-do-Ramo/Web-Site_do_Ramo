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
		name, 
		setName,
		lastName,
		setLastName,
		address,
		setAddress,
		phoneNumber,
		setPhoneNumber,
		email,
		setEmail,
		facebook,
		setFacebook,
		LinkedIn,
		setLinkedIn,
		instagram,
		setInstagram,
		clearAll
	} = useContext(PSEFormContext);


  const listFormRegistro = [
    {
      label: 'Nome Completo',
      id: 'name',
      type: 'text',
      placeholder: 'Digite seu nome',
      required: true,
      value: name,
      set: setName
    },
    {
      label: 'Telefone',
      id: 'telefone',
      type:'text',
      placeholder:'(21) 9xxxx-xxxx',
      required: true,
      value: phoneNumber,
      set: setPhoneNumber,
      mask:"(00) 00000-0000"
    },
    {
      label: 'E-mail',
      id: 'email',
      type:'text',
      placeholder: 'Digite seu email',
      required: true,
      value: email,
      set: setEmail,
    }
  ]
  
  const listSocialMedia = [
    {
      label: null,
      id: 'facebook',
      type: 'text',
      placeholder: 'Facebook',
      required: true,
      value:facebook,
      set: setFacebook
    },
    {
      label: null,
      id: 'linkedin',
      type:'text',
      placeholder: 'Linkedin',
      required: false,
      value:LinkedIn,
      set: setLinkedIn
    },
    {
      label: null,
      id: 'instagram',
      type:'text',
      placeholder: 'Instagram',
      required: false,
      value:instagram,
      set: setInstagram
    }
  ]
  
	function handleCancel() {
		clearAll();
		router.push("/PSE");
	}

	return (
		<>
			<section className={styles.leftSide}>
				<PSEFormHeader page='1'/>
				
				<article>
					<h1>Registro</h1>
					<p>Insira suas informações pessoais.</p>

					<div className={styles.message}>
						<AiFillLock/>
						<p>
							Levamos as questões de privacidade a sério. Você pode ter
							certeza de que seus dados pessoais estão protegidos com 
							segurança.
						</p>
					</div>

					<div className={styles.leftForm}>
            {
              listFormRegistro.map(item => {
                return <BasicInput key={item.id} item={item}/>
              })
            }
					</div>
				</article>
			</section>

			<section className={styles.rightSide}>
				<article className={styles.rightForm}>
          <span>Redes Sociais</span>
          {
            listSocialMedia.map(item => { 
              return <BasicInput key={item.id} item={item}/>
            })
          }
					<div className={styles.buttonsHolder}>
						<button type='button' className={styles.cancel} onClick={handleCancel}>Cancelar</button>
						<button type='button' className={styles.next} onClick={() => router.push("/PSE/cadastro?page=2")}>Próximo</button>
					</div>
				</article>
			</section>
    </>
	)
}