import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import MarketingMenuRoutes from '../../../../components/MarketingMenuRoutes';
import MarketingNavBar from '../../../../components/MarketingNavBar';
import { AuthContext } from '../../../../contexts/AuthContext';
import api from '../../../../services/api';
import styles from '../criar/styles.module.scss';

export default function Criar() {
  const router = useRouter();

  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { user, isAuthenticated } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      if (user === null) {
        router.push('/login');
      } else if (!user.isAdmin) {
        router.push('/marketing/equipes');
      } else {
        setIsLoading(false);
      }
    }
  }, [user, isAuthenticated]);

  let imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  async function handleCreateCrew() {
    try {
      if (name.length > 0 && description.length > 0 && image) {
        const formData = new FormData();
        const imagefile = document.getElementById('avatarInput');

        const crew = await api.post('/crew', { name, about: description });

        formData.append('picture', imagefile.files[0]);

        await api.post(`/image/${crew.data.id}_crew_avatar`, formData, {
          headers: {
            'Content-Type': `multipart/form-data`
          }
        });

        router.replace('/marketing/equipes');
      } else {
        toast.error('cadastro incompleto');
      }
    } catch (error) {
      toast.error('não foi possível criar a equipe');
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
              routesName={`Equipes/Criar`}
              routes={`equipes/criar`}
            />
            <h1>Criar Equipe</h1>

            <div className={styles.logoName}>
              <div className={styles.logoHolder}>
                <h1>Logo da equipe</h1>
                <div className={styles.img}>
                  <img src={image}></img>
                  <input
                    type='file'
                    onChange={imageHandler}
                    accept='.png, image/jpeg'
                    id='avatarInput'
                  />
                </div>
              </div>

              <div className={styles.nameHolder}>
                <h1>Nome da equipe</h1>
                <input
                  type='text'
                  placeholder='Digite o nome da equipe'
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
            </div>

            <div className={styles.description}>
              <h1>Descrição da equipe</h1>
              <textarea
                placeholder='Digite a descrição da equipe'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>

            <div className={styles.buttonRow}>
              <button
                className={styles.cancel}
                onClick={() => router.push('/marketing/equipes')}
              >
                Cancelar
              </button>
              <button className={styles.edit} onClick={handleCreateCrew}>
                Criar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
