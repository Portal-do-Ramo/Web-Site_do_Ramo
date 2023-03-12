import MarketingNavBar from "../../../../../../../components/MarketingNavBar";
import api from "../../../../../../../services/api";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import MarketingMenuRoutes from "../../../../../../../components/MarketingMenuRoutes";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../../../contexts/AuthContext";
import { toast } from "react-toastify";

export default function projetoEditar({ crew, project }){ 
    const router = useRouter();

	const [logo, setLogo] = useState(project.logoURL);
	const [banner, setBanner] = useState(project.imageURL);

	const { user, isAuthenticated } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

	const [name, setName] = useState(project.name);
	const [description, setDescription] = useState(project.description);
	const [members, setMembers] = useState(project.members);
	
	const [isFinished, setIsFinished] = useState(true);
	
    useEffect(() => {
		if (isAuthenticated) {
			if (user === null) {
				router.push("/login");
            } else {
				setIsLoading(false);
			}
        }
    }, [user, isAuthenticated]);

	useEffect(() => {
		async function convertImage(image) {
			let blob = await fetch(image).then(r => r.blob());
			let dataUrl = await new Promise(resolve => {
				let reader = new FileReader();
				reader.onload = () => resolve(reader.result);
				reader.readAsDataURL(blob);
			});

			return dataUrl;
		}

		async function execute() {
			setLogo(await convertImage(logo));
			setBanner(await convertImage(banner));

			let beginDateFormatted = new Date(project.beginning);
			beginDateFormatted.setMinutes(beginDateFormatted.getMinutes() - beginDateFormatted.getTimezoneOffset());
			document.getElementById("beginDateInput").value = beginDateFormatted.toISOString().slice(0, 16);

			if (project.ended) {
				let endDateFormatted = new Date(project.ended);
				endDateFormatted.setMinutes(endDateFormatted.getMinutes() - endDateFormatted.getTimezoneOffset());
				document.getElementById("endDateInput").value = endDateFormatted.toISOString().slice(0, 16);
			} else {
				setIsFinished(false);
			}
		}

		execute();
	}, []);

	async function handleUpdateProject() {
		try {
			let formData = new FormData();
			const logoImageFile = document.getElementById("logoInput");
			const bannerImageFile = document.getElementById("bannerInput");
			
			if (logoImageFile.files[0]) {
				formData.append("picture", logoImageFile.files[0]);
				
				await api.post(`/image/${project.id}_project_avatar`, formData, {
					headers: {
						"Content-Type": `multipart/form-data`
					}
				});
			}

			if (bannerImageFile.files[0]) {
				formData = new FormData();
				
				formData.append("picture", bannerImageFile.files[0]);
	
				await api.post(`/image/${project.id}_project_banner`, formData, {
					headers: {
						"Content-Type": `multipart/form-data`
					}
				});
			}
			
			const date = new Date();

			let offset = date.getTimezoneOffset();

			offset = offset / 60;

			offset = "00" + offset;

			offset = offset.slice(-2);

			let beginDateFormatted = `${document.getElementById("beginDateInput").value}:00.000-${offset}:00`;
			let endDateFormatted = null;

			if (isFinished) {
				endDateFormatted = `${document.getElementById("endDateInput").value}:00.000-${offset}:00`;

				await api.patch(`/project/${project.id}`, {
					project: {
						name,
						description,
						beginning: beginDateFormatted,
						ended: endDateFormatted,
						members,
						crew_id: crew.id
					}
				});
			} else {
				await api.patch(`/project/${project.id}`, {
					project: {
						name,
						description,
						beginning: beginDateFormatted,
						ended: null,
						members,
						crew_id: crew.id
					}
				});
			}

			toast.success("Projeto atualizado!");
		} catch (error) {
			toast.error("Não foi possível editar o projeto");
		}
	}

	let logoHandler = e => {
		const reader = new FileReader();
		reader.onload = () => {
			if(reader.readyState === 2) {
				setLogo(reader.result);
			}
		}
		reader.readAsDataURL(e.target.files[0]);
	}

	let bannerHandler = e => {
		const reader = new FileReader();
		reader.onload = () => {
			if(reader.readyState === 2) {
				setBanner(reader.result);
			}
		}
		reader.readAsDataURL(e.target.files[0]);
	}
		
	if (isLoading) {
        return ( <></> )
    } else {
		return (
			<div className={styles.all}>
				<MarketingNavBar page="equipes" user={user ? user : null} />
		
				<div className={styles.pageContent}>
					<div className={styles.content}>
						<MarketingMenuRoutes 
							routesName={`Equipes/${crew.name}/Projetos/${name}/Editar`} 
							routes={`equipes/${crew.id}/projetos/${project.id}/editar`}
						/>
						<h1>Editar Projeto</h1>
		
						<div className={styles.logoBanner}>
							<div className={styles.logoHolder}>
								<span>Logo do projeto</span>
								<div className={styles.img}> 
									<img src={logo} ></img>
									<input
										type="file"
										onChange={logoHandler}
										accept=".png, image/jpeg"
										id="logoInput"
									/>
								</div>
							</div>
			
							<div className={styles.bannerHolder}>
								<span>Banner do projeto</span>
								<div className={styles.img} id={styles.bannerImg}> 
									<img src={banner}></img>
									<input
										type="file"
										onChange={bannerHandler}
										accept=".png, image/jpeg"
										id="bannerInput"
									/>
								</div>
							</div>
						</div>
		
						<div className={styles.description}>
							<div className={styles.nameHolder}>
								<span>Nome do projeto</span>
								<input
									type="text"
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
											type="datetime-local"
											max="9999-12-31T23:59"
											name="beginDate"
											id="beginDateInput"
										/>
									</div>

								</article>
								
								<article>
									<p> data de fim </p>
									<div className={ !isFinished ? styles.endFixed : styles.end}>
										<input 
											type="datetime-local"
											max="9999-12-31T23:59"
											name="endDate"
											id="endDateInput"
											disabled={!isFinished}
											className={ !isFinished ? styles.beginDateInputOff : "" }
										/>
									</div>

									<input 
										type="checkbox"
										name="notFinished"
										id="notFinished"
										checked={!isFinished}
										onChange={() => setIsFinished(!document.getElementById("notFinished").checked)}
									/>
									<label htmlFor="notFinished">Em andamento</label>
								</article>
							</section>
						</div>
		
						<div className={styles.buttonRow}>
							<button 
								className={styles.cancel}
								onClick={() => router.push(`/marketing/equipes/${crew.id}/projetos/${project.id}`)}
							> Cancelar </button>
							
							<button
								className={styles.edit}
								onClick={handleUpdateProject}
							> Editar </button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export async function getServerSideProps(ctx) {
	const { crewId, projectId } = ctx.params;
  
	try {
	  let { data: crew } = await api.get(`/crew/${crewId}`);
	  let { data: project } = await api.get(`/project/${projectId}`);
	  
	  return {
		props: {
		  crew,
		  project
		}
	  }
	} catch (error) {
	  return {
		notFound: true
	  }
	}
}
