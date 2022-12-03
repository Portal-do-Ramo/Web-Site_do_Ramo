import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AiFillLock } from 'react-icons/ai';
import { IMaskInput } from "react-imask";
import PSEFormHeader from '../../../components/PSEFormHeader';
import { PSEFormContext } from '../../../contexts/PSEFormContext';
import styles from '../../../styles/pseCadastro.module.scss';

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
						<span>Nome, Sobrenome e Endereço <strong>*</strong></span>
						<div className={styles.nameInputs}>
							<input type="text" placeholder='Nome' value={name} onChange={(event) => setName(event.target.value)}></input>
							<input type="text" placeholder='Sobrenome' value={lastName} onChange={(event) => setLastName(event.target.value)}></input>
						</div>
						
						<div className={styles.addressInput}>
							<input type="text"
								placeholder='Endereço'
								value={address}
								onChange={(event) => setAddress(event.target.value)}
							/>
						</div>

						<span>Celular <strong>*</strong></span>
						<IMaskInput 
							mask="(00) 00000-0000"
							name='phoneNumber'
							placeholder='(21) 9xxxx-xxxx'
							value={phoneNumber}
							onChange={(event) => setPhoneNumber(event.target.value)}
						/>
						
						<span>E-mail <strong>*</strong></span>
						<input type="email" placeholder='nome@email.com' value={email} onChange={(event) => setEmail(event.target.value)}/>
					</div>
				</article>
			</section>

			<section className={styles.rightSide}>
				<article className={styles.rightForm}>
					<span>Redes Sociais</span>
					<input type="text" placeholder='Facebook' value={facebook} onChange={(event) => setFacebook(event.target.value)}/>
					<input type="text" placeholder='Linkedin' value={LinkedIn} onChange={(event) => setLinkedIn(event.target.value)}/>
					<input type="text" placeholder='Instagram' value={instagram} onChange={(event) => setInstagram(event.target.value)}/>
					<div className={styles.buttonsHolder}>
						<button type='button' className={styles.cancel} onClick={handleCancel}>Cancelar</button>
						<button type='button' className={styles.next} onClick={() => router.push("/PSE/cadastro?page=2")}>Próximo</button>
					</div>
				</article>
			</section>
		</>
	)
}