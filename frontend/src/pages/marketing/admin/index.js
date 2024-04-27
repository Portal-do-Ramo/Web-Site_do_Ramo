import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import X from '../../../../public/X.svg';
import { BsFillGearFill } from 'react-icons/bs';
import { FaRegTrashAlt } from 'react-icons/fa';
import styles from './styles.module.scss';
import api from '../../../services/api';

import MarketingNavBar from '../../../components/MarketingNavBar';
import MarketingMenuRoutes from '../../../components/MarketingMenuRoutes';

import { AuthContext } from '../../../contexts/AuthContext';
import Modal from 'react-modal';
import Image from 'next/image';
import { DeleteAlertModal } from '../../../components/DeleteAlertModal';
import { toast } from 'react-toastify';

export default function admin({ crews }) {
  const router = useRouter();

  const { user, isAuthenticated } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    password: '',
    crew: ''
  });
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState(false);

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
    const fetchUsers = async () => {
      try {
        const { data } = await api.get('/users');
        setUsers(data.users);
      } catch (error) {
        router.push('/marketing');
      }
    };

    if (isAuthenticated && user !== null) {
      fetchUsers();
    }
  }, [isAuthenticated, user]);

  function focusInput(inputId) {
    const input = document.getElementById(inputId);
    input.focus();
  }

  //Abre modal de de edição de usuário
  const handleOpenModalUpdate = (user) => {
    setSelectedUser(user);
    setUpdatedUser({ ...user });
    setModalUpdateIsOpen(true);
  };

  //Abre um modal de confirmação de exclusão de usuário
  const handleOpenModalDelete = (user) => {
    setSelectedUser(user);
    setModalDeleteIsOpen(true);
  };

  //Fecha o modal de edição/confirmação de exclusão
  const handleCloseModal = () => {
    setSelectedUser(null);
    setModalUpdateIsOpen(false);
    setModalDeleteIsOpen(false);
  };

  //Recebe o ID de equipe do usuário e retorna o obj correspondente a essa equipe
  const findCrewById = (userCrewId) => {
    return crews.find((crew) => crew.id === userCrewId);
  };

  //Salva as alterações feitas em um usuário
  async function handleSaveUserChanges() {
    try {
      let requestBody = {
        name: updatedUser.name.trim(),
        email: user.email,
        crew_id: updatedUser.crew_id,
        isAdmin: user.isAdmin
      };

      if (updatedUser.password) {
        requestBody.password = updatedUser.password.trim();
      }

      await api.patch(`/user/${selectedUser.id}`, requestBody);
      router.reload();
    } catch (error) {
      console.error(error);
    }
  }

  const countSuperUsers = users.filter((user) => user.isAdmin).length;
  const countCoordinators = users.length - countSuperUsers;

  //Deleta coordenador
  async function handleDeleteCoord() {
    try {
      await api.delete(`/user/${selectedUser.id}`);
      toast.success('Usuário deletado com sucesso');
      router.reload();
    } catch (error) {
      toast.error('Não foi possível deletar o usuário');
    }
  }

  if (isLoading) {
    return <></>;
  } else {
    return (
      <div className={styles.all}>
        <Head>
          <title>Marketing - Admin | IEEE CEFET-RJ</title>
        </Head>

        <MarketingNavBar page='admin' user={user ? user : null} />

        <div className={styles.pageContent}>
          <div className={styles.content}>
            <MarketingMenuRoutes
              routesName={`Administradores`}
              routes={`admin`}
            />
            <div className={styles.row}>
              <div className={styles.text}>
                <h1>Lista de Administradores</h1>
                <p>
                  {countCoordinators > 1
                    ? `${countCoordinators} coordenadores e`
                    : `1 coordenador e`}
                  {countSuperUsers > 1
                    ? ` ${countSuperUsers} administradores`
                    : ` 1 administrador`}
                </p>
              </div>
            </div>

            <div className={styles.usersList}>
              {users.map((user) => {
                const nameURL = `https://ui-avatars.com/api/?name=${
                  user ? user.name : 'Unknown'
                }`;
                const userCrew = findCrewById(user.crew_id);

                return (
                  <div
                    key={user.id}
                    className={styles.userRow}
                    style={
                      user.isAdmin
                        ? { backgroundColor: 'rgba(13, 95, 170, 0.2)' }
                        : {}
                    }
                  >
                    <div className={styles.name}>
                      {user.isAdmin ? (
                        <img
                          src='/Ramo_logo.svg'
                          className={styles.userImage}
                        />
                      ) : userCrew ? (
                        <img
                          src={userCrew.imageURL}
                          className={styles.userImage}
                        />
                      ) : (
                        <img src={nameURL} className={styles.userImage} />
                      )}
                      <h2>{user.name}</h2>
                    </div>

                    <div className={styles.options}>
                      <span
                        className={
                          user.isAdmin
                            ? styles.adminGearConfig
                            : styles.gearConfig
                        }
                        onClick={() => handleOpenModalUpdate(user)}
                      >
                        <BsFillGearFill />
                      </span>
                      {!user.isAdmin && (
                        <>
                          <span
                            className={styles.deleteButtonCoord}
                            onClick={() => handleOpenModalDelete(user)}
                          >
                            <FaRegTrashAlt />
                          </span>
                          <DeleteAlertModal
                            clickFunction={handleDeleteCoord}
                            handleCloseModal={handleCloseModal}
                            id={user.id}
                            text={
                              'Tem certeza que você deseja excluir este coordenador?'
                            }
                            title={'Excluir coordenador'}
                            modalIsOpen={modalDeleteIsOpen}
                          />
                        </>
                      )}
                    </div>

                    <Modal
                      overlayClassName={styles.overlay}
                      isOpen={modalUpdateIsOpen}
                      onRequestClose={handleCloseModal}
                      className={styles.modal}
                    >
                      <div>
                        <div className={styles.modalHeader}>
                          {user.isAdmin ? (
                            <img
                              src='/Ramo_logo.svg'
                              className={styles.userImage}
                            />
                          ) : userCrew ? (
                            <img
                              src={userCrew.imageURL}
                              className={styles.userImage}
                            />
                          ) : (
                            <img src={nameURL} className={styles.userImage} />
                          )}
                          <span onClick={handleCloseModal}>
                            <Image src={X} width={20} height={20} />
                          </span>
                        </div>
                        <div className={styles.inputContainer}>
                          <div>
                            <h3>Nome:</h3>
                            <input
                              type='text'
                              value={updatedUser.name}
                              onChange={(e) =>
                                setUpdatedUser({
                                  ...updatedUser,
                                  name: e.target.value
                                })
                              }
                            />
                          </div>
                          <div>
                            <h3>E-mail:</h3>
                            <input
                              type='text'
                              className={styles.emailInput}
                              disabled
                              placeholder={updatedUser.email}
                            />
                          </div>
                          {updatedUser.isAdmin !== true && (
                            <div onClick={() => focusInput('crewSelector')}>
                              <h3>Equipe:</h3>
                              <select
                                id='crewSelector'
                                onChange={(e) =>
                                  setUpdatedUser({
                                    ...updatedUser,
                                    crew_id: e.target.value
                                  })
                                } //
                                value={updatedUser.crew_id}
                                style={{
                                  color:
                                    updatedUser.crew === '' ? '#9A9A9A' : ''
                                }}
                              >
                                <option value='' disabled>
                                  Selecione uma equipe
                                </option>
                                {crews.map((crew) => (
                                  <option
                                    key={crew.id}
                                    value={crew.id}
                                    style={{ color: 'black' }}
                                  >
                                    {crew.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          <div>
                            <h3>Senha:</h3>
                            <input
                              type='password'
                              value={updatedUser.password || ''}
                              onChange={(e) =>
                                setUpdatedUser({
                                  ...updatedUser,
                                  password: e.target.value
                                })
                              }
                              placeholder='*********'
                            />
                          </div>
                        </div>
                        <div className={styles.buttonsBox}>
                          <button
                            className={styles.Create}
                            type='submit'
                            onClick={handleSaveUserChanges}
                          >
                            Salvar alterações
                          </button>
                        </div>
                      </div>
                    </Modal>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const getServerSideProps = async () => {
  let { data: crews } = await api.get('/crews');

  return {
    props: {
      crews
    }
  };
};
