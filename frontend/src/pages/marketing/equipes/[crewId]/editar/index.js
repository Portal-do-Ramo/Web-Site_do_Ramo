import MarketingNavBar from "../../../../../components/MarketingNavBar";
import api from "../../../../../services/api";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MarketingMenuRoutes from "../../../../../components/MarketingMenuRoutes";
import EquipeAPI from "../../../../../services/equipeAPI";
import { toast } from "react-toastify";

export default function equipeEditar({ crew }){ 
    const router = useRouter();

	const [image, setImage] = useState(crew.imageURL);
    const [name, setName] = useState(crew.name);
    const [description, setDescription] = useState(crew.about);

	useEffect(() => {
		async function convertImage() {
			let blob = await fetch(image).then(r => r.blob());
			let dataUrl = await new Promise(resolve => {
				let reader = new FileReader();
				reader.onload = () => resolve(reader.result);
				reader.readAsDataURL(blob);
			});

			setImage(dataUrl);
		}

		convertImage();
	}, []);

    async function handleUpdateCrew() {
		try {
            if (name.length > 0 && description.length > 0 && image) {
				await api.patch(`/crew/${crew.id}`, {
					crew: {
						name,
						about: description
					}
				});
				
				const imagefile = document.getElementById("avatarInput");
				
				if (imagefile.files[0]) {
					const formData = new FormData();
	
					formData.append("picture", imagefile.files[0]);

					await api.post(`/image/${name}_avatar`, formData, {
						headers: {
							"Content-Type": `multipart/form-data`
						}
					});
				}
				
                toast.success("equipe atualizada!");
            } else {
                toast.error("formulário incompleto");
            }
        } catch (error) {
            toast.error("não foi possível editar a equipe");
        }
    }

    let imageHandler = e => {
      const reader = new FileReader();
      reader.onload = () => {
        if(reader.readyState === 2) {
          setImage(reader.result);
        }
      }
      reader.readAsDataURL(e.target.files[0]);
    }

    return (
		<div className={styles.all}>
			<MarketingNavBar/>

			<div className={styles.pageContent}>
				<div className={styles.content}>
					<MarketingMenuRoutes
						routesName={`Equipes/${crew.name}/Editar`} 
						routes={`equipes/${crew.id}/editar`}
					/>
					<h1>Editar Equipe</h1>
	
					<div className={styles.logoName}>
						<div className={styles.logoHolder}>
							<h1>Logo da equipe</h1>
							<div className={styles.img}> 
								<img src={image}></img>
								<input
									type="file"
									id="avatarInput"
									onChange={imageHandler}
									accept=".png, image/jpeg, .svg"
								/>
							</div>
						</div>
	
						<div className={styles.nameHolder}>
							<h1>Nome da equipe</h1>
							<input
								id="name"
								type="text"
								placeholder='Digite o nome da equipe'
								defaultValue={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
					</div>
	
					<div className={styles.description}>
						<h1>Descrição da equipe</h1>
						<textarea
							id="description"
							placeholder='Digite a descrição da equipe'
							defaultValue={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
	
					<div className={styles.buttonRow}>
						<button className={styles.cancel}>Cancelar</button>
						<button
							className={styles.edit}
							onClick={handleUpdateCrew}
						> Editar </button>
					</div>
				</div>
			</div>
		</div>
    )
}

export async function getServerSideProps(ctx) {
  const { crewId } = ctx.params;

  try {
    let { data } = await api.get(`/crew/${crewId}`);
    
    return {
      props: {
        crew: data
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
