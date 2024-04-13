import Head from 'next/head';
import styles from '../styles/login.module.scss';
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function Login() {
  const router = useRouter();

  const { register, handleSubmit } = useForm();
  const [errMessage, setErrMessage] = useState(null);
  const { signIn, user, isAuthenticated } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  //Alterna a visibilidade da senha no campo senha
  function changePasswordInputVisibility() {
    if (document.getElementById('show_password_input').checked) {
      document.getElementById('password_input').type = 'text';
    } else {
      document.getElementById('password_input').type = 'password';
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      if (user) {
        router.push('/marketing');
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

  //Responsável pelo login
  async function handleSignIn(data) {
    try {
      await signIn(data);
      router.push('/marketing');
    } catch (err) {
      setErrMessage(err.message);
    }
  }

  if (isLoading) {
    return <></>;
  } else {
    return (
      <div className={styles.loginContainer}>
        <Head>
          <title>Login | Ramo IEEE CEFET-RJ</title>
        </Head>

        <div className={styles.leftImage}></div>

        <div className={styles.loginContent}>
          <img src='logo_azul.svg' />

          <form className={styles.form} onSubmit={handleSubmit(handleSignIn)}>
            <h3>Bem Vindo!</h3>
            <h1>Faça seu Login</h1>

            <label className={styles.inputsLabel}>E-mail</label>
            <input
              {...register('email')}
              type='email'
              placeholder='E-mail'
              required
            />
            <br />

            <label className={styles.inputsLabel}>Senha</label>
            <input
              {...register('password')}
              type='password'
              placeholder='Senha'
              id='password_input'
              required
            />
            <br />

            <div
              className={styles.radioContainer}
              onClick={changePasswordInputVisibility}
            >
              <label htmlFor='show_password_input'>
                <input type='checkbox' id='show_password_input' /> Mostrar senha
              </label>
              <span>Esqueceu a senha?</span>
            </div>

            <br />

            <section className={styles.buttonsContainer}>
              <button type='button' onClick={() => router.push('/')}>
                Voltar
              </button>
              <button type='submit'>Login</button>
            </section>
          </form>

          <div></div>
        </div>
      </div>
    );
  }
}
