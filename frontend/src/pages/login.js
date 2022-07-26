import Head from "next/head"; 
import styles from "../styles/login.module.scss";
import { useForm } from 'react-hook-form'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';

export default function Login(){
    const router = useRouter();

    const { register, handleSubmit } = useForm();
    const [errMessage, setErrMessage] = useState(null);
    const { signIn, user, isAuthenticated } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            if (user) {
                router.push("/marketing");
            } else {
                setIsLoading(false);
            }
        }
    }, [user, isAuthenticated]);

    useEffect(() => {
        if (errMessage) {
            toast.error(errMessage);
            setErrMessage(null);
        }
    }, [errMessage]);

    async function handleSignIn(data) {
        try {
            await signIn(data);
            router.push("/marketing");
        } catch(err) {
            setErrMessage(err.message);
        }
    }
    
    if (isLoading) {
        return ( <></> )
    } else {
        return (
            <div className={styles.loginContainer}>
                <Head>
                    <title>Login | Ramo IEEE CEFET-RJ</title>
                </Head>

                <div className={styles.leftImage}></div>
    
                <div className={styles.loginContent}>
                    <img src="logo_azul.svg"/>
                    
                    <form className={styles.form} onSubmit={handleSubmit(handleSignIn)}>
                        <h3>Bem Vindo!</h3>
                        <h1>Faça seu Login</h1>
    
                        <label className={styles.inputsLabel}>E-mail</label>
                        <input {...register('email')} type="email" placeholder="E-mail" required/><br/>
                        
                        <label className={styles.inputsLabel}>Senha</label>    
                        <input {...register('password')} type="password" placeholder="Senha" required/><br/>
    
                        <div className={styles.radioContainer}>
                            <label htmlFor="manter-conectado"><input type="checkbox" id="manter-conectado"/> Matenha-me conectado</label>
                            <span>Esqueceu a senha?</span>
                        </div><br/>    
                        
                        <section className={styles.buttonsContainer}>
                            <button type="button" onClick={() => router.push("/")}>Voltar</button>
                            <button type="submit">Login</button>
                        </section>
                    </form>
    
                    <div></div>
                </div>
            </div>
        )
    }

}