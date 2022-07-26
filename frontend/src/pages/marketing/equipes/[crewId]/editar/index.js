import MarketingNavBar from "../../../../../components/MarketingNavBar";
import api from "../../../../../services/api";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";
import MarketingMenuRoutes from "../../../../../components/MarketingMenuRoutes";
import EquipeAPI from "../../../../../services/equipeAPI";

export default function equipeEditar({ crew }){ 
    const router = useRouter();
    const [state, setState] = useState(crew.imageURL);

    function handleSelectOption(option) {
        router.push(`${crew.id}/${option}`);    
    }

    function submit() {
      let newName = document.getElementById('name').value;
      let newDescription = document.getElementById('description').value;
    }

    let imageHandler = e => {
      const reader = new FileReader();
      reader.onload = () => {
        if(reader.readyState === 2) {
          setState(reader.result);
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
								<img src={state}></img>
								<input type="file" alt="" onChange={imageHandler} accept="image/*"></input>
							</div>
						</div>
	
						<div className={styles.nameHolder}>
							<h1>Nome da equipe</h1>
							<input id="name" type="text" placeholder='Digite o nome da equipe' defaultValue={crew.name}></input>
						</div>
					</div>
	
					<div className={styles.description}>
						<h1>Descrição da equipe</h1>
						<textarea id="description" placeholder='Digite a descrição da equipe' defaultValue={crew.about}></textarea>
					</div>
	
					<div className={styles.buttonRow}>
						<button className={styles.cancel}>Cancelar</button>
						<button className={styles.edit} onClick={submit}>Editar</button>
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
