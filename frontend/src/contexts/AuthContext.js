import { createContext, useState } from "react";
import api from '../services/api'
import { setCookie } from 'nookies'
import Router from 'next/router'

export const AuthContext = createContext({})

export function AuthProvider({children}) {
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

        Router.push('/');
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}