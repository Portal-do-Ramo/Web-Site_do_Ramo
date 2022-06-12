import { createContext, useEffect, useState } from "react";

export const PSEFormContext = createContext({})

export function PSEFormContextProvider({children}) {
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
    const [motivation, setMotivation] = useState("");
    const [experience, setExperience] = useState("");

    const [isFistPageValidated, setIsFistPageValidated] = useState(false);
    const [isSecondPageValidated, setIsSecondPageValidated] = useState(false);
    const [isThirdPageValidated, setIsThirdPageValidated] = useState(false);

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
      setMotivation("");
      setExperience("");
    }

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
    }, [crew, area])

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
        isThirdPageValidated
      }}>
          {children}
      </PSEFormContext.Provider>
  )
}