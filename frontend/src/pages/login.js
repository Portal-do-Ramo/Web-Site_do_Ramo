import styles from "../styles/login.module.scss";

export default function Login(){
    return(
        <div className={styles.loginContainer}>
            <div></div>
            <div className={styles.loginContent}>

                <img src="logo_azul.svg"/>
                
                <form className={styles.form}>
                    <h3>Bem Vindo!</h3>
                    <h1>Faça seu Login</h1>

                    <label className={styles.inputsLabel}>E-mail</label>
                    <input type="email" placeholder="E-mail" required/><br/>
                    
                    <label className={styles.inputsLabel}>Senha</label>    
                    <input type="password" placeholder="Senha" required/><br/>

                    <div className={styles.radioContainer}>
                        
                        <label for="manter-conectado"><input type="checkbox" id="manter-conectado"/> Matenha-me conectado</label>

                        <span><a href="#" >Esqueceu a senha?</a></span>
                        
                    </div><br/>    
                    
                    <button type="submit">Login</button>
                </form>

                <div></div>
            </div>
        </div>
    )
}