import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { useRouter } from 'next/router';

export const PSEFormContext = createContext({})

export function PSEFormContextProvider({children}) {
	const router = useRouter();

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [facebook, setFacebook] = useState("");
    const [LinkedIn, setLinkedIn] = useState("");
    const [instagram, setInstagram] = useState("");
    const [registration, setRegistration] = useState("");
    const [course, setCourse] = useState("");
    const [currentTimeCourse, setCurrentTimeCourse] = useState("");
    const [crew, setCrew] = useState("");
    const [area, setArea] = useState("");
	const [dynamicMainDate, setDynamicMainDate] = useState("");
	const [dynamicSecondaryDate, setDynamicSecondaryDate] = useState("");
    const [motivation, setMotivation] = useState("");
    const [experience, setExperience] = useState("");

    const [isFistPageValidated, setIsFistPageValidated] = useState(false);
    const [isSecondPageValidated, setIsSecondPageValidated] = useState(false);
    const [isThirdPageValidated, setIsThirdPageValidated] = useState(false);

    useEffect(() => {
		if (
			name.length > 3
			&& lastName.length > 3
			&& address.length > 3
			&& phoneNumber.length > 14
			&& email.length > 3
		) {
			setIsFistPageValidated(true)
		} else {
			setIsFistPageValidated(false)
		}
    }, [name, lastName, address, phoneNumber, email, facebook, instagram, LinkedIn])

    useEffect(() => {
		if (
			registration.length > 7
			&& course.length > 3
			&& currentTimeCourse.length >= 1
		) {
			setIsSecondPageValidated(true)
		} else {
			setIsSecondPageValidated(false)
		}
    }, [registration, course, currentTimeCourse])
    
    useEffect(() => {
		if (
			crew.length >= 3
			&& area.length > 3
		) {
			setIsThirdPageValidated(true)
		} else {
			setIsThirdPageValidated(false)
		}
    }, [crew, area, dynamicMainDate, dynamicSecondaryDate]);

	function clearAll() {
		setName("");
		setLastName("");
		setAddress("");
		setPhoneNumber("");
		setEmail("");
		setFacebook("");
		setInstagram("");
		setLinkedIn("");

		setRegistration("");
		setCourse("");
		setCurrentTimeCourse("");
		
		setCrew("");
		setArea("");
		setDynamicMainDate("");
		setDynamicSecondaryDate("");
		setMotivation("");
		setExperience("");
    }

	async function handleSendCSV() {
		try {
			if (isFistPageValidated && isSecondPageValidated && isThirdPageValidated) {				
				await api.post("/pse", {
					nomeCompleto: `${name.replace(", ", " -")} ${lastName.replace(", ", " -")}`,
					endereco: address.replace(", ", " -"),
					celular: phoneNumber.replace(", ", " -"),
					email: email.replace(", ", " -"),
					facebook: facebook.replace(", ", " -"),
					linkedIn: LinkedIn.replace(", ", " -"),
					instagram: instagram.replace(", ", " -"),
					matricula: registration.replace(", ", " -"),
					curso: course.replace(", ", " -"),
					periodo: currentTimeCourse.replace(", ", " -"),
					equipe: crew.replace(", ", " -"),
					area: area.replace(", ", " -"),
					dataDinamicaPrincipal: dynamicMainDate.replace(", ", " -"),
					dataDinamicaSecundaria: dynamicSecondaryDate.replace(", ", " -"),
					porQuaisMotivos: motivation.replace(", ", " -"),
					experiencia: experience.replace(", ", " -"),
				});

				toast.success("Cadastro concluído");
				clearAll();
				router.push("/PSE");
			} else {
				toast.error("Formulário incompleto");
			}
		} catch (error) {
			toast.error("Não foi possível enviar");
		}
	}

    return (
		<PSEFormContext.Provider 
			value={{
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
				registration,
				setRegistration,
				course,
				setCourse,
				currentTimeCourse,
				setCurrentTimeCourse,
				crew,
				setCrew,
				area,
				setArea,
				motivation,
				setMotivation,
				experience,
				setExperience,
				clearAll,
				isFistPageValidated,
				isSecondPageValidated,
				isThirdPageValidated,
				handleSendCSV,
				dynamicMainDate,
				setDynamicMainDate,
				dynamicSecondaryDate,
				setDynamicSecondaryDate
			}}
		>
          	{children}
      	</PSEFormContext.Provider>
  	)
}