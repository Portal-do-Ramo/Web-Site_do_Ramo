import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import MarketingMenuRoutes from '../../../components/MarketingMenuRoutes';
import MarketingNavBar from '../../../components/MarketingNavBar';
import { AuthContext } from '../../../contexts/AuthContext';
import styles from './styles.module.scss';
import { FiUser, FiMail } from 'react-icons/fi';
import { CgPassword, CgUserList } from 'react-icons/cg';
import { toast } from 'react-toastify';
import api from '../../../services/api';

export default function index() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedCrew, setSelectedCrew] = useState('');
  const [crews, setCrews] = useState([]);

  const { user, isAuthenticated } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      if (user === null) {
        router.push('/login');
      } else if (!user.isAdmin) {
        router.push('/marketing');
      } else {
        setIsLoading(false);
      }
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    async function fetchCrews() {
      try {
        const response = await api.get('/crews');

        setCrews(
          response.data.map((crew) => ({
            name: crew.name,
            crewId: crew.id
          }))
        );
      } catch (error) {
        console.error('Erro ao obter as crews:', error);
      }
    }

    fetchCrews();
  }, []);

  function focusInput(inputId) {
    const input = document.getElementById(inputId);
    input.focus();
  }

  async function handleCreateUser() {
    try {
      if (confirmPassword !== password) {
        toast.error('Senha e confirmação de senha precisam ser iguais!');
      } else {
        if (
          name.length > 0 &&
          email.length > 0 &&
          password.length > 0 &&
          selectedCrew != ''
        ) {
          await api.post(`/user`, {
            name,
            email,
            password,
            crew_id: selectedCrew
          });

          toast.success('Cadastro realizado com sucesso!');

          router.replace('/marketing');
        } else {
          toast.error('Cadastro incompleto.');
        }
      }
    } catch (error) {
      toast.error('Não foi possível criar o usuário');
    }
  }

  if (isLoading) {
    return <></>;
  } else {
    return (
      <div className={styles.all}>
        <Head>
          <title>Marketing - Início | IEEE CEFET-RJ</title>
        </Head>

        <MarketingNavBar page='inicio' user={user ? user : null} />

        <div className={styles.pageContent}>
          <section className={styles.menuRoutes}>
            <MarketingMenuRoutes
              routesName={`Início/Cadastro`}
              routes={`./cadastro`}
            />
          </section>

          <section className={styles.content}>
            <article>
              <h1>Crie um novo usuário!</h1>

              <div
                className={styles.textInput}
                onClick={() => focusInput('nameInput')}
              >
                <FiUser id='nameInputIcon' />
                <input
                  type='text'
                  id='nameInput'
                  placeholder='Digite o nome do usuário'
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              <div
                className={styles.textInput}
                onClick={() => focusInput('emailInput')}
              >
                <FiMail id='emailInputIcon' />
                <input
                  type='email'
                  id='emailInput'
                  placeholder='Digite o email do usuário'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <div
                className={styles.textInput}
                onClick={() => focusInput('crewSelector')}
              >
                <CgUserList id='crewSelectorIcon' />
                <select
                  id='crewSelector'
                  onChange={(e) => setSelectedCrew(e.target.value)}
                  value={selectedCrew}
                  style={{ color: selectedCrew === '' ? '#9A9A9A' : '' }}
                >
                  <option value='' disabled>
                    Selecione uma equipe
                  </option>
                  {crews.map((crew) => (
                    <option
                      key={crew.crewId}
                      value={crew.crewId}
                      style={{ color: 'black' }}
                    >
                      {crew.name}
                    </option>
                  ))}
                </select>
              </div>

              <div
                className={styles.textInput}
                onClick={() => focusInput('passwordInput')}
              >
                <CgPassword id='passwordInputIcon' />
                <input
                  type='password'
                  id='passwordInput'
                  placeholder='Digite a senha do usuário'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>

              <div
                className={styles.textInput}
                onClick={() => focusInput('confirmPasswordInput')}
              >
                <CgPassword id='passwordInputIcon' />
                <input
                  type='password'
                  id='confirmPasswordInput'
                  placeholder='Confirme a senha do usuário'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
              </div>

              <div className={styles.buttonRow}>
                <button
                  className={styles.cancelButton}
                  onClick={() => router.push('/marketing')}
                >
                  Cancelar
                </button>
                <button
                  className={styles.createButton}
                  onClick={handleCreateUser}
                >
                  Criar
                </button>
              </div>
            </article>
          </section>
        </div>
      </div>
    );
  }
}
