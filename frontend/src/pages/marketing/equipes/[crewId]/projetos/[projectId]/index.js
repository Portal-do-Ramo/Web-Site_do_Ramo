import MarketingNavBar from '../../../../../../components/MarketingNavBar';
import Modal from 'react-modal';
import api from '../../../../../../services/api';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import MarketingMenuRoutes from '../../../../../../components/MarketingMenuRoutes';
import { AuthContext } from '../../../../../../contexts/AuthContext';
import { toast } from 'react-toastify';

export default function projeto({ crew, project }) {
  const router = useRouter();

  const { user, isAuthenticated } = useContext(AuthContext);

  const [modalIsOpen, setModalIsOpen] = useState(false);
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

  function handleSelectOption(option) {
    router.replace(
      `/marketing/equipes/${crew.id}/projetos/${project.id}/${option}`
    );
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function handleCloseModal() {
    setModalIsOpen(false);
  }

  async function handleDeleteProject() {
    try {
      await api.delete(`/project/${project.id}`);
      router.push(`/marketing/equipes/${crew.id}/projetos`);
    } catch (error) {
      setModalIsOpen(false);
      toast.error('Não foi possível apagar o projeto');
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
              routesName={`Equipes/${crew.name}/Projetos/${project.name}`}
              routes={`equipes/${crew.id}/projetos/${project.id}`}
            />
            <section id={styles.upper}>
              <img src={project.logoURL}></img>
              <div className={styles.nameSub}>
                <span>{project.name}</span>
                <p>{project.members.split(',').length} Membros</p>
              </div>
            </section>

            <section id={styles.lower}>
              <button
                type='button'
                onClick={() => handleSelectOption('editar')}
              >
                <img src='/gerenciarProjetos.svg'></img>
                <span>Editar Projeto</span>
              </button>

              <button type='button' onClick={openModal}>
                <img src='/excluirEquipe.svg'></img>
                <span>Excluir Projeto</span>
              </button>

              <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                className={styles.modal}
                overlayClassName={styles.overlay}
                contentLabel='Example Modal'
                shouldCloseOnEsc={true}
                style={{ overlay: { zIndex: 10 } }}
              >
                <img src='/cancel.svg'></img>
                <h1>Excluir Projeto</h1>
                <p>Tem certeza que você deseja excluir este projeto?</p>
                <div className={styles.rowButton}>
                  <button
                    type='button'
                    className={styles.cancel}
                    onClick={handleCloseModal}
                  >
                    Cancelar
                  </button>
                  <button
                    type='button'
                    className={styles.shutDown}
                    onClick={handleDeleteProject}
                  >
                    Sim, excluir
                  </button>
                </div>
              </Modal>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export async function getServerSideProps(ctx) {
  const { crewId, projectId } = ctx.params;

  try {
    let { data: crew } = await api.get(`/crew/${crewId}`);
    let { data: project } = await api.get(`/project/${projectId}`);

    if (!project) {
      throw new Error('id do projeto não existe');
    }

    return {
      props: {
        crew,
        project
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}
