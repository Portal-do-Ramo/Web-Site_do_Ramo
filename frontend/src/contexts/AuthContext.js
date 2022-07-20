import { createContext, useEffect, useState } from "react";
import api from '../services/api'
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { toast } from "react-toastify";

export const AuthContext = createContext({})

export function AuthContextProvider({children}) {
    const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
		setIsAuthenticated(false);
        const token = Cookies.get('token');
		
        if (token) {
			try {
				const verify = jwt.verify(token, process.env.TOKEN_SECRET);
				
				setUser({
					name: verify.name, 
					email: verify.email
				});
          } catch (error) {
			signOut();
		  }
        }

		setIsAuthenticated(true);
      }, []);

	async function signIn ({email, password}) {
		try {
			const { data } = await api.post('/login', { email, password });
			
			Cookies.set('token', data.token, { expires: 60 });
			api.defaults.headers.Authorization = `Bearer ${data.token}`

			const verify = jwt.verify(data.token, process.env.TOKEN_SECRET);
			
			setUser({
				name: verify.name, 
				email: verify.email	
			});
		} catch (error) {
			throw new Error("Email ou senha incorreta!");
		}
	}

	async function signOut() {
		try {
			Cookies.remove('token');
			delete api.defaults.headers.Authorization;

			setUser(null);
		} catch (error) {
			throw new Error("Nenhum usuário logado!");
		}
	}

	async function register({ email, password, name }) {
		try {
			const { data } = await api.post('/user', { email, password, name });

			toast.success("Usuário cadastrado");
		} catch (error) {
			throw new Error("Não foi possível realizar o cadastro");
		}
	}

    return (
        <AuthContext.Provider 
        value={{
            user,
            signIn,
			isAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    )
}