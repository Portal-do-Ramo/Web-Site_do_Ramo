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

export default function admin(){
	const router = useRouter();

		const { user, isAuthenticated } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
		const [selectedUser, setSelectedUser] = useState(null);
		const [users, setUsers] = useState([]);
		const [updatedUser, setUpdatedUser] = useState({
			name: "",
			email: "",
			password: "",
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
		
			
	  const handleOpenModal = (user) => {
			setSelectedUser(user);
			setUpdatedUser({ ...user });
		};
	
		const handleCloseModal = () => {
			setSelectedUser(null);
		};

		async function handleSaveUserChanges() {
			try {
				if (updatedUser && updatedUser.password && updatedUser.password.trim() !== "") {
					
					let requestBody = {
						name: updatedUser.name,
						email: updatedUser.email,
						crew_id: user.crew_id,
						isAdmin: user.isAdmin,
						password: updatedUser.password,
					};
		
					const { data } = await api.patch(`/user/${selectedUser.id}`, requestBody);
					console.log(data);
					router.reload();
				} else {
					let requestBody = {
						name: updatedUser.name,
						email: updatedUser.email,
						crew_id: user.crew_id,
						isAdmin: user.isAdmin,
					};
					console.log(requestBody);
					
					const { data } = await api.patch(`/user/${selectedUser.id}`, requestBody);
					console.log(data);
					router.reload();
				}
			} catch (error) {
				console.error(error);
			}
		}


		let nameURL = `https://ui-avatars.com/api/?name=${user ? user.name : "Unknown"}`
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
							<h1>Lista de Coordenadores</h1>
							<p>{users.length} Coordenadores</p>
						</div>
					</div>
	  
					<div className={styles.usersList}>
						  {users.map((user) => { 
								return(
									<div className={styles.userRow}>
										<div className={styles.name}>
											<img src={nameURL} className={styles.userImage}/>
											<h2>{user.name}</h2>
										</div>
										
										<span className={styles.gearConfig} onClick={()=>handleOpenModal(user)}><BsFillGearFill/></span>
										{selectedUser && selectedUser.id === user.id && (
												
												<Modal overlayClassName={styles.overlay} isOpen={true} onRequestClose={handleCloseModal} className={styles.modal}>
													<div >
														<div className={styles.modalHeader}>
															<img src={nameURL} className={styles.userImage}/>
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
																<h3>Email:</h3>
																<input
																 type="text" 
																 value={updatedUser.email}
																 onChange={(e) =>
																	 setUpdatedUser({ ...updatedUser, email: e.target.value })
																 }
															 />
															</div>
															<div>
																<h3>Senha:</h3>
																<input 
																 type="password" 
																 value={updatedUser.password}
																 onChange={(e) =>
																	 setUpdatedUser({ ...updatedUser, password: e.target.value })
																 }
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

// export const getServerSideProps = async ({ res }) => {

// };
