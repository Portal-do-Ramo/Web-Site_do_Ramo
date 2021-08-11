import { createContext, useState } from "react";
import api from '../services/api'
import { setCookie } from 'nookies'
import Router from 'next/router'
import UpdateState from '../services/UpdateState'

export const Context = createContext({})

export function Provider({children}) {
    //AutheticationContext
    const [user, setUser] = useState(null)

    let isAuthenticated = null;

    async function signIn({ email, password }) {
        const { token } = await api.post('/login', {
            email,
            password,
        });

        setCookie(undefined, 'token', token, {
            maxAge: 60 * 60 * 1, // 1 hora
        });

        //setUser(user);

        isAuthenticated = true;

        Router.push('/marketing');
    }

    //ImageContext
    const [images, setImages] = useState([])
    const [previewImages, setPreviewImages] = useState([])

    function handleSelectImages(event) {
        if(!event.target.files) return
        console.log(event.target.files);
        const selectedImage = event.target.files[0];
        
        const selectedImagePreview = URL.createObjectURL(selectedImage);
        
        UpdateState(images,setImages,selectedImage);
        UpdateState(previewImages,setPreviewImages,selectedImagePreview);
    }

    return (
        <Context.Provider 
        value={{ 
        user, isAuthenticated, signIn, //authContext
        handleSelectImages, images, previewImages, setPreviewImages, setImages //imagesContext
        }}>
            {children}
        </Context.Provider>
    )
}