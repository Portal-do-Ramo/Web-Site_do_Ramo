import styles from "../styles/login.module.scss";
import { useForm } from 'react-hook-form'
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/router";

export default function Login(){
    const router = useRouter();

    const { register, handleSubmit } = useForm();
    const { signIn } = useContext(AuthContext);
    const [errMessage, setErrMessage] = useState(null);

    async function handleSignIn(data) {
        try {
            await signIn(data);
        } catch(err) {
            setErrMessage(err);
        }
    }

    return(
        <div className={styles.loginContainer}>
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
                        <label for="manter-conectado"><input type="checkbox" id="manter-conectado"/> Matenha-me conectado</label>
                        <span><a href="#" >Esqueceu a senha?</a></span>
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