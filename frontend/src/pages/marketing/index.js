import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import MarketingMenuRoutes from '../../components/MarketingMenuRoutes';
import MarketingNavBar from '../../components/MarketingNavBar';
import { AuthContext } from '../../contexts/AuthContext';
import styles from '../../styles/marketing.module.scss';
import { HiUserAdd } from 'react-icons/hi';
import Link from 'next/link';

export default function index() {
  const router = useRouter();

  const { user, isAuthenticated } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      if (user === null) {
        router.push('/login');
      } else {
        setIsLoading(false);
      }
    }
  }, [user, isAuthenticated]);

  if (isLoading || user === undefined) {
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
            <MarketingMenuRoutes routesName={`Início`} routes={`/`} />
          </section>

          <section className={styles.content}>
            <article>
              <h1>Bem-vindo, {user && user.name}!</h1>

              <p>
                Aqui você encontrará ferramentas para personalizar certas partes
                do site do Ramo, como equipes, seus prêmios e seus projetos.
              </p>

              {user && user.isAdmin && (
                <p>Além de poder controlar o sistema do PSE.</p>
              )}

              {user && user.isAdmin ? (
                <Link href={'/marketing/cadastro'}>
                  <span className={styles.link}>
                    <HiUserAdd />
                    Criar novo usuário
                  </span>
                </Link>
              ) : null}
            </article>
          </section>
        </div>
      </div>
    );
  }
}
