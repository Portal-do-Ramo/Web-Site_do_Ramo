import MarketingNavBar from '../../../../../../components/MarketingNavBar';
import styles from '../criar/styles.module.scss';
import MarketingMenuRoutes from '../../../../../../components/MarketingMenuRoutes';
import api from '../../../../../../services/api';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../../../contexts/AuthContext';
import { toast } from 'react-toastify';

export default function CriarProjeto({ crew }) {
  const router = useRouter();

  const [logo, setLogo] = useState('');
  const [banner, setBanner] = useState('');

  const { user, isAuthenticated } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState([]);

  const [isFinished, setIsFinished] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      if (user === null) {
        router.push('/login');
      } else {
        setIsLoading(false);
      }
    }
  }, [user, isAuthenticated]);

  let logoHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setLogo(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  let bannerHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setBanner(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  async function handleCreateProject() {
    try {
      if (
        logo.length > 0 &&
        banner.length > 0 &&
        name.length > 1 &&
        description.length > 1 &&
        members.length > 0
      ) {
        const date = new Date();

        let offset = date.getTimezoneOffset();

        offset = offset / 60;

        offset = '00' + offset;

        offset = offset.slice(-2);

        let beginDateFormatted = `${document.getElementById('beginDateInput').value}:00.000-${offset}:00`;
        let endDateFormatted = null;

        let project;

        if (isFinished) {
          endDateFormatted = `${document.getElementById('endDateInput').value}:00.000-${offset}:00`;
          console.log('====================================');
          console.log(beginDateFormatted);
          console.log(endDateFormatted);
          console.log('====================================');

          project = await api.post('/project', {
            name,
            description,
            members,
            beginning: beginDateFormatted,
            ended: endDateFormatted,
            crew_id: crew.id
          });
        } else {
          project = await api.post('/project', {
            name,
            description,
            members,
            beginning: beginDateFormatted,
            crew_id: crew.id
          });
        }

        let formData = new FormData();
        const logoImageFile = document.getElementById('logoInput');
        formData.append('picture', logoImageFile.files[0]);

        await api.post(`/image/${project.data.id}_project_avatar`, formData, {
          headers: {
            'Content-Type': `multipart/form-data`
          }
        });

        formData = new FormData();
        const bannerImageFile = document.getElementById('bannerInput');
        formData.append('picture', bannerImageFile.files[0]);

        await api.post(`/image/${project.data.id}_project_banner`, formData, {
          headers: {
            'Content-Type': `multipart/form-data`
          }
        });

        router.push(`/marketing/equipes/${crew.id}/projetos`);
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error('Não foi possível criar um projeto');
    }
  }

  if (isLoading) {
    return <></>;
  } else {
    return (
      <div className={styles.all}>
        <MarketingNavBar page='equipes' user={user ? user : null} />

        <div className={styles.pageContent}>
          <div className={styles.content}>
            <MarketingMenuRoutes
              routesName={`Equipes/${crew.name}/Projetos/Criar`}
              routes={`equipes/${crew.id}/projetos/criar`}
            />
            <h1>Criar Projeto</h1>

            <div className={styles.logoBanner}>
              <div className={styles.logoHolder}>
                <span>Logo do projeto</span>
                <div className={styles.img}>
                  <img src={logo}></img>
                  <input
                    type='file'
                    onChange={logoHandler}
                    accept='.png, image/jpeg'
                    id='logoInput'
                  />
                </div>
              </div>

              <div className={styles.bannerHolder}>
                <span>Banner do projeto</span>
                <div className={styles.img} id={styles.bannerImg}>
                  <img src={banner}></img>
                  <input
                    type='file'
                    onChange={bannerHandler}
                    accept='.png, image/jpeg'
                    id='bannerInput'
                  />
                </div>
              </div>
            </div>

            <div className={styles.description}>
              <div className={styles.nameHolder}>
                <span>Nome do projeto</span>
                <input
                  type='text'
                  placeholder='Digite o nome do projeto'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>

              <div className={styles.descriptionHolder}>
                <span>Descrição do projeto</span>
                <textarea
                  placeholder='Digite a descrição do projeto'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className={styles.members}>
                <span>Membros do projeto</span>
                <input
                  placeholder='Separe os nomes por vírgula (nome1, nome2...)'
                  value={members}
                  onChange={(e) => setMembers(e.target.value)}
                ></input>
              </div>

              <section className={styles.datesContainer}>
                <article>
                  <p> data de início </p>
                  <div className={styles.begin}>
                    <input
                      type='datetime-local'
                      max='9999-12-31T23:59'
                      name='beginDate'
                      id='beginDateInput'
                    />
                  </div>
                </article>

                <article>
                  <p> data de fim </p>
                  <div className={!isFinished ? styles.endFixed : styles.end}>
                    <input
                      type='datetime-local'
                      max='9999-12-31T23:59'
                      name='endDate'
                      id='endDateInput'
                      disabled={!isFinished}
                      className={!isFinished ? styles.beginDateInputOff : ''}
                    />
                  </div>

                  <input
                    type='checkbox'
                    name='notFinished'
                    id='notFinished'
                    onChange={() =>
                      setIsFinished(
                        !document.getElementById('notFinished').checked
                      )
                    }
                  />
                  <label htmlFor='notFinished'>Em andamento</label>
                </article>
              </section>
            </div>

            <div className={styles.buttonRow}>
              <button
                className={styles.cancel}
                onClick={() =>
                  router.push(`/marketing/equipes/${crew.id}/projetos`)
                }
              >
                {' '}
                Cancelar{' '}
              </button>

              <button className={styles.edit} onClick={handleCreateProject}>
                {' '}
                Criar{' '}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export async function getServerSideProps(ctx) {
  const { crewId } = ctx.params;

  try {
    let { data: crew } = await api.get(`/crew/${crewId}`);

    return {
      props: {
        crew
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}
