import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { useRouter } from 'next/router';

export const PSEFormContext = createContext({})

export function PSEFormContextProvider({children}) {
	const router = useRouter();

    const [fullname, setFullName] = useState("");
    
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    
    const [linkedin, setLinkedin] = useState("");
    const [instagram, setInstagram] = useState("");
    const [register, setRegister] = useState("");
    const [crew, setCrew] = useState("");
    const [area, setArea] = useState("");
		const [reason, setReason] = useState("");
		const [experience, setExperience] = useState("");
		const [course, setCourse] = useState("");
		const [currentPeriod, setCurrentPeriod] = useState("");
		const [pcd, setPcd] = useState("");
		const [neuroatypicality, setNeuroatypicality ] = useState("");
		const [gender, setGender] = useState("");
		const [availableDate, setAvailableDate] = useState([])
    const [selfDeclaration, setSelfDeclaration] = useState("");
  
    const [isFistPageValidated, setIsFistPageValidated] = useState(false);
    const [isSecondPageValidated, setIsSecondPageValidated] = useState(false);
    const [isThirdPageValidated, setIsThirdPageValidated] = useState(false);
    const [isFourthPageValidated, setIsFourthPageValidated] = useState(false);
  
    useEffect(() => {
		if (
			fullname.length > 3			
			&& phone.length > 9
			&& email.length > 3
		) {
			setIsFistPageValidated(true)
		} else {
			setIsFistPageValidated(false)
		}
    }, [fullname, phone, email, instagram, linkedin])

    useEffect(() => {
		if (
			register.length > 7
			&& course.length > 3
			&& currentPeriod.length >= 1
		) {
			setIsSecondPageValidated(true)
		} else {
			setIsSecondPageValidated(false)
		}
    }, [register, course, currentPeriod])
    
    useEffect(() => {
		if (
			crew.length >= 3
      && area.length > 3
      && availableDate.length > 0
      && reason.length > 3
      && experience.length >3
		) {
			setIsThirdPageValidated(true)
		} else {
			setIsThirdPageValidated(false)
		}
    }, [crew, area, availableDate, reason, experience]);
    
    useEffect(() => {
      if (
        pcd.length > 1
        && neuroatypicality.length > 1
        && gender.length > 2
        && selfDeclaration.length > 2
      ) {
        setIsFourthPageValidated(true)
      } else {
        setIsFourthPageValidated(false)
      }
      }, [pcd, neuroatypicality, gender, selfDeclaration])

	function clearAll() {
		setFullName("");
		setPhone("");
		setEmail("");
		setInstagram("");
		setLinkedin("");

		setRegister("");
		setCourse("");
		setCurrentPeriod("");
		
		setCrew("");
		setArea("");
		setAvailableDate([]);
		setReason("")
    setExperience("");
    
    setNeuroatypicality('')
    setGender('')
    setPcd('')
    setSelfDeclaration('')
    }

  
  async function handleSendCSV() {
		try {
      if (
        isFistPageValidated
        && isSecondPageValidated
        && isThirdPageValidated
        && isFourthPageValidated
      ){				
				await api.post("/pse", {
					fullname: fullname.replace(", ", " -") ,
					phone: phone.replace(/\D+/g, ''),
					email: email.replace(", ", " -"),
					linkedin: linkedin.replace(", ", " -"),
					instagram: instagram.replace(", ", " -"),
					register: register.replace(", ", " -"),
					course: course.replace(", ", " -"),
					currentPeriod: currentPeriod.replace(", ", " -"),
					crew: crew.replace(", ", " -"),
					area: area.replace(", ", " -"),
					availableDate: availableDate,
					reason: reason.replace(",", "-"),
          experience: experience.replace(", ", " -"),

          PcD:pcd.replace(", ", " -"),
          neuroatypicality: neuroatypicality.replace(", ", " -"),
          gender: gender.replace(", ", " -"),
          selfDeclaration:selfDeclaration.replace(", ", " -")
        });
        

				toast.success("Cadastro concluído");
				clearAll();
				router.push("/PSE");
			} else {
				toast.error("Formulário incompleto");
			}
    } catch (error) {
      console.log('ERRO: ', error)
			toast.error("Não foi possível enviar");
		}
	}

    return (
		<PSEFormContext.Provider 
			value={{
				fullname,
				setFullName,
				phone,
				setPhone,
				email,
				setEmail,
				gender,
				setGender,
				selfDeclaration,
				setSelfDeclaration,
				linkedin,
				setLinkedin,
				instagram,
				setInstagram,
				register,
				setRegister,
				course,
				setCourse,
				currentPeriod,
				setCurrentPeriod,
				crew,
				setCrew,
				area,
				setArea,
				reason,
				setReason,
				experience,
        setExperience,
        
				clearAll,
				isFistPageValidated,
				isSecondPageValidated,
        isThirdPageValidated,
        isFourthPageValidated,
				handleSendCSV,
				
        availableDate,
				setAvailableDate,
				pcd,
				setPcd,
				neuroatypicality,
				setNeuroatypicality
        
			}}
		>
          	{children}
      	</PSEFormContext.Provider>
  	)
}