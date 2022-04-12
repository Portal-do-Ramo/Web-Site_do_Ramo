import { createContext, useState } from "react";

export const PSEFormContext = createContext({})

export function PSEFormContextProvider({children}) {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [location, setLocation] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [facebook, setFacebook] = useState("");
    const [LinkedIn, setLinkedIn] = useState("");
    const [instagram, setInstagram] = useState("");
    const [Registration, setRegistration] = useState("");
    const [course, setCourse] = useState("");
    const [currentTimeCourse, setCurrentTimeCourse] = useState("");
    const [crew, setCrew] = useState("");
    const [area, setArea] = useState("");

    return (
      <PSEFormContext.Provider 
      value={{ 
        name,
        setName,
        lastName,
        setLastName,
        location,
        setLocation,
        phoneNumber,
        setPhoneNumber,
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

      }}>
          {children}
      </PSEFormContext.Provider>
  )
}