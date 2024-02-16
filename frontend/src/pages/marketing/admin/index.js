import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

import X from '../../../../public/X.svg';
import { BiPlusMedical } from 'react-icons/bi';
import { BsFillGearFill } from 'react-icons/bs';

import styles from "./styles.module.scss";
import api from '../../../services/api'

import MarketingNavBar from "../../../components/MarketingNavBar"
import MarketingMenuRoutes from "../../../components/MarketingMenuRoutes";

import { AuthContext } from "../../../contexts/AuthContext";
import Modal from "react-modal";
import Image from "next/image";

export default function admin({crews}){
	const router = useRouter();

		const { user, isAuthenticated } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
		const [selectedUser, setSelectedUser] = useState(null);
		const [users, setUsers] = useState([]);
		const [updatedUser, setUpdatedUser] = useState({
			name: "",
			password: "",
			crew:"",
		});


    useEffect(() => {
			if (isAuthenticated) {
				if (user === null) {
					router.push("/login");
				} else if(!user.isAdmin){
					router.push("/marketing");
				} else {
					setIsLoading(false);
				}
			}
    }, [user, isAuthenticated]);

		useEffect(() => {
			const fetchUsers = async () => {
				try {
					const { data } = await api.get("/users");
					setUsers(data.users);
					
				} catch (error) {
					router.push("/marketing");
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
	  const handleOpenModal = (user) => {
			setSelectedUser(user);
			setUpdatedUser({ ...user });
		};
	
		const handleCloseModal = () => {
			setSelectedUser(null);
		};

		const findCrewById = (userCrewId) => {
			return crews.find((crew) => crew.id === userCrewId);
		};

		async function handleSaveUserChanges() {
			try {
        let requestBody = {
          name: updatedUser.name.trim(),
          email: user.email,
          crew_id: updatedUser.crew_id,
          isAdmin: user.isAdmin,
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


	const countSuperUsers = users.filter(user => user.isAdmin).length
	const countCoordinators = users.length - countSuperUsers
	const DeleteCoordinator = ()_ => {}
		
	if (isLoading) {
        return ( <></> )
    } else {

		return (
		  <div className={styles.all}>
			<Head>
			  <title>Marketing - Admin | IEEE CEFET-RJ</title>
			</Head>
	  
			<MarketingNavBar page="admin" user={user ? user : null} />
	  
			<div className={styles.pageContent}>
				<div className={styles.content}>
					<MarketingMenuRoutes routesName={`Administradores`} routes={`admin`}/>
					<div className={styles.row}>
						<div className={styles.text}>
							<h1>Lista de Administradores</h1>
							<p>
								{countCoordinators > 1 ? `${countCoordinators} coordenadores e` : `1 coordenador e`}
								 {countSuperUsers > 1 ? ` ${countSuperUsers} administradores` : ` 1 administrador`}
							</p>
						</div>
					</div>
	  
					<div className={styles.usersList}>
						  {users.map((user) => {
								const nameURL = `https://ui-avatars.com/api/?name=${user ? user.name : "Unknown"}`
								const userCrew = findCrewById(user.crew_id);

								return (
									<div key={user.id} 
										className={styles.userRow}
										style={user.isAdmin ? { backgroundColor: 'rgba(13, 95, 170, 0.2)' } : {}}
									>
										<div className={styles.name}>

											{user.isAdmin ? (
												<img src="/Ramo_logo.svg" className={styles.userImage} />
											) : (
												userCrew ? (
													<img src={userCrew.imageURL} className={styles.userImage} />
												) : (
													<img src={nameURL} className={styles.userImage} />
												)
											)}
											<h2>{user.name}</h2>
										</div>
										
										<span
											
											className={user.isAdmin ?  styles.adminGearConfig: styles.gearConfig}
											onClick={()=>handleOpenModal(user)}><BsFillGearFill/>
										</span>
										{selectedUser && selectedUser.id === user.id && (
												
												<Modal overlayClassName={styles.overlay} isOpen={true} onRequestClose={handleCloseModal} className={styles.modal}>
													<div >
														<div className={styles.modalHeader}>
														{user.isAdmin ? (
																<img src="/Ramo_logo.svg" className={styles.userImage} />
															) : (
																userCrew ? (
																	<img src={userCrew.imageURL} className={styles.userImage} />
																) : (
																	<img src={nameURL} className={styles.userImage} />
																)
															)}
															<span onClick={handleCloseModal}>
																<Image src={X} width={20} height={20} />
															</span>
														</div>
														<div className={styles.inputContainer}>
															<div>
																<h3>Nome:</h3>
																<input
																 type="text"
																 value={updatedUser.name}
																	onChange={(e) =>
																		setUpdatedUser({ ...updatedUser, name: e.target.value })
																	}
																/>
															</div>
															<div>
																<h3>E-mail:</h3>
																<input
																 type="text"
																 className={styles.emailInput}
																 disabled
																 placeholder={updatedUser.email}
															 />
															</div>
														{updatedUser.isAdmin !== true && (
																<div onClick={() => focusInput("crewSelector")}>
																	<h3>Equipe:</h3>
																	<select
	
																			id="crewSelector"
																			onChange={(e) => setUpdatedUser({ ...updatedUser, crew_id: e.target.value })}// 
																			value={updatedUser.crew_id}
																			style={{ color: updatedUser.crew === "" ? "#9A9A9A" : "" }}
																	>
																			<option value="" disabled>Selecione uma equipe</option>
																			{crews.map(crew => (
																					<option key={crew.id} value={crew.id} style={{ color: "black"}}>
																							{crew.name}
																					</option>
																			))}
																	</select>
																</div>
															)}	

															

															<div>
																<h3>Senha:</h3>
																<input 
																	type="password" 
																	value={updatedUser.password || ""}
																	onChange={(e) =>
																		setUpdatedUser({ ...updatedUser, password: e.target.value })
																	}
																	placeholder="*********"
																/>
															</div>
														</div>
														<div className={styles.buttonsBox}>
															<button className={styles.Create} type="submit" onClick={handleSaveUserChanges}>Salvar alterações</button>
														</div>
													</div>
												</Modal>
											)
										}

									</div>
								)
						  })}
					</div>
				</div>
			</div>
		  </div>
		) 
	}
}

export const getServerSideProps = async () => {
  let {data : crews} = await api.get("/crews");

  return {
    props: {
      crews
    }
  }
}
