import MarketingNavBar from "../../../../components/MarketingNavBar";
import Modal from 'react-modal';
import api from "../../../../services/api";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import MarketingMenuRoutes from "../../../../components/MarketingMenuRoutes";
import { AuthContext } from "../../../../contexts/AuthContext";

export default function equipe({ crew }){ 
    const router = useRouter();
	
	const { user, isAuthenticated } = useContext(AuthContext);

    const [modalIsOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
		if (isAuthenticated) {
            if (user === null) {
                router.push("/login");
            } else {
				setIsLoading(false);
			}
        }
    }, [user, isAuthenticated]);

	function handleSelectOption(option) {
		router.push(`${crew.id}/${option}`);    
	}

	function openModal() {
	setIsOpen(true);
	}

	function handleCloseModal() {
	setIsOpen(false);
	}

	if (isLoading) {
        return ( <></> )
    } else {
		return (
		  <div className={styles.all}>
			<MarketingNavBar page="equipes"/>
	  
			<div className={styles.pageContent}>
			  <div className={styles.content}>
				<MarketingMenuRoutes routesName={`Equipes/${crew.name}`} routes={`equipes/${crew.id}`}/>
	  
				<section className={styles.grid}>
				  <button type="button" onClick={() => handleSelectOption("projetos")}>
					<img src="/gerenciarProjetos.svg"></img>
					<span>Gerenciar Projetos</span>
				  </button>
	  
				  <button type="button" onClick={() => handleSelectOption("premios")}>
					  <img src="/gerenciarPremios.svg"></img>
					  <span>Gerenciar Prêmios</span>
					</button>
	  
				  <button type="button" onClick={() => handleSelectOption("editar")}>
					  <img src="/editarEquipe.svg"></img>
					  <span>Editar Equipe</span>
					</button>
	  
				  <button type="button" onClick={openModal}>
					<img src="/excluirEquipe.svg"></img>
					<span>Excluir Equipe</span>
				  </button>
				</section>
	  
				  <Modal 
				  isOpen={modalIsOpen}
				  onRequestClose={handleCloseModal}
				  className={styles.modal}
				  overlayClassName={styles.overlay}
				  contentLabel="Example Modal"
				  shouldCloseOnEsc={true}  
				  >
					<img src="/cancel.svg"></img>
					<h1>Excluir Equipe</h1>
					<p>Tem certeza que você deseja excluir esta equipe?</p>
					<div className={styles.rowButton}>
						<button type='button' className={styles.cancel} onClick={handleCloseModal}>Cancelar</button>
						<button type='button' className={styles.shutDown}>Sim, excluir</button>
					</div>
				 </Modal>
			  </div>
			</div>
		  </div>
		)
	}
}

export async function getServerSideProps(ctx) {
  const { crewId } = ctx.params;

  try {
    let { data } = await api.get(`/crews/${crewId}`);
    
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
