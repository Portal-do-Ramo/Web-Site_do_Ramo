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
    const [Registration, setRegistration] = useState("");
    const [course, setCourse] = useState("");
    const [currentTimeCourse, setCurrentTimeCourse] = useState("");
    const [crew, setCrew] = useState("");
    const [area, setArea] = useState("");
    const [motivation, setMotivation] = useState("");
    const [experience, setExperience] = useState("");

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
        Registration,
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
        clearAll
      }}>
          {children}
      </PSEFormContext.Provider>
  )
}