import styles from "../styles/login.module.scss";

export default function Login(){
    return(
        <div className={styles.loginContainer}>
            <div></div>
            <div className={styles.loginContent}>

                
               
                <img src="logo_azul.svg"/>
                
                <form className={styles.Form}>
                    <h3>Bem vindo!</h3>
                    <h1>Faça seu Login</h1>
                    <input type="email" placeholder="E-mail" required/><br/>
                        
                    <input type="password" placeholder="Senha" required/><br/>

                    <div className={styles.RadioContainer}>
                        <span>
                            <input type="radio"/>
                            <label>Matenha-me conectado</label>
                        </span> 
                        <a href="#" >Esqueceu a senha?</a>
        
                    </div><br/>                    
                    <button type="submit">Login</button>
                </form>

                <div></div>
            </div>
        </div>
    )
}