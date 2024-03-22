import MarketingNavBar from '../../../../../../../components/MarketingNavBar';
import api from '../../../../../../../services/api';
import MarketingMenuRoutes from '../../../../../../../components/MarketingMenuRoutes';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../../../../contexts/AuthContext';
import { toast } from 'react-toastify';

export default function premioEditar({ crew, award }) {
  const router = useRouter();

  const { user, isAuthenticated } = useContext(AuthContext);

  const [name, setName] = useState(award.name);
  const [year, setYear] = useState(award.year);
  const [placing, setPlacing] = useState(award.placing);

  const [years, setYears] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const placings = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  useEffect(() => {
    if (isAuthenticated) {
      if (user === null) {
        router.push('/login');
      } else {
        setIsLoading(false);
      }
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    let newYears = [];

    for (let i = 0; i <= new Date().getFullYear() - 2000; i++) {
      newYears.push(new Date().getFullYear() - i);
    }

    setYears(newYears);
  }, []);

  async function handleUpdateAward() {
    try {
      await api.patch(`/award/${award.id}`, {
        award: {
          name,
          placing,
          year,
          crew_id: crew.id
        }
      });

      toast.success('Prêmio atualizado!');
    } catch (error) {
      toast.error('Não foi possível criar esse prêmio');
    }
  }

  if (isLoading) {
    return <></>;
  } else {
    return (
      <div className={styles.all}>
        <MarketingNavBar page={'equipes'} user={user ? user : null} />

        <div className={styles.pageContent}>
          <div className={styles.content}>
            <MarketingMenuRoutes
              routesName={`Equipes/${crew.name}/Prêmios/${name}/Editar`}
              routes={`equipes/${crew.id}/premios/${award.id}/editar`}
            />

            <h1>Editar Prêmio</h1>

            <div className={styles.description}>
              <div className={styles.nameHolder}>
                <span>Nome do prêmio</span>
                <input
                  type='text'
                  placeholder='Digite o nome do prêmio'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className={styles.other}>
                <div className={styles.selects}>
                  <span>Ano da premiação</span>
                  <select
                    required
                    value={year}
                    onChange={(event) => setYear(event.target.value)}
                  >
                    {years.map((year, idx) => {
                      return (
                        <option key={idx} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className={styles.selects}>
                  <span>Colocação</span>
                  <select
                    required
                    value={placing}
                    onChange={(event) => setPlacing(event.target.value)}
                  >
                    {placings.map((placing, idx) => {
                      return (
                        <option key={idx} value={placing}>
                          {placing}º
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.buttonRow}>
              <button
                className={styles.cancel}
                onClick={() =>
                  router.push(
                    `/marketing/equipes/${crew.id}/premios/${award.id}`
                  )
                }
              >
                {' '}
                Cancelar{' '}
              </button>

              <button className={styles.edit} onClick={handleUpdateAward}>
                {' '}
                Editar{' '}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export async function getServerSideProps(ctx) {
  const { crewId, awardId } = ctx.params;

  try {
    let { data: crew } = await api.get(`/crew/${crewId}`);
    let { data: award } = await api.get(`/award/${awardId}`);

    return {
      props: {
        crew,
        award
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}
