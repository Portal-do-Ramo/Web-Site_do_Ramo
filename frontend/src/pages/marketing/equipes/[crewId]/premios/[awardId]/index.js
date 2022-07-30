import MarketingNavBar from "../../../../../../components/MarketingNavBar";
import Modal from 'react-modal';
import api from "../../../../../../services/api";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import MarketingMenuRoutes from "../../../../../../components/MarketingMenuRoutes";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import { toast } from "react-toastify";

export default function premio({ crew, award }){ 
    const router = useRouter();
    const [modalIsOpen, setIsOpen] = useState(false);

	const { user, isAuthenticated } = useContext(AuthContext);
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

    function openModal() {
      setIsOpen(true);
    }
  
    function handleCloseModal() {
      setIsOpen(false);
    }

	async function handleDeleteAward() {
		try {
			await api.delete(`/award/${award.id}`);
			router.push(`/marketing/equipes/${crew.id}/premios`);
		} catch (error) {
			toast.error("Não foi possível apagar o prêmio");
		}
	}

	function handleSelectOption(option) {
        router.push(`${award.id}/${option}`);    
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
							routesName={`Equipes/${crew.name}/Prêmios/${award.name}`} 
							routes={`equipes/${crew.id}/premios/${award.id}`}
						/>
			
						<section className={styles.upper}>
							<article className={styles.awardImg}>
								<img src="../../../../award.svg" alt="award image"/>
								<strong>{award.placing}</strong>
							</article>

							<div className={styles.nameSub}>
								<span>{award.name}</span>
								<p>{award.year}</p>
							</div>
						</section>
			
						<section className={styles.lower}>
							<button type="button" onClick={() => handleSelectOption("editar")}>
								<img src="/editarPremio.svg"></img>
								<span>Editar Prêmio</span>
							</button>
				
							<button type="button" onClick={openModal}>
								<img src="/excluirPremio.svg"></img>
								<span>Excluir Prêmio</span>
							</button>
			
							<Modal 
								isOpen={modalIsOpen}
								onRequestClose={handleCloseModal}
								className={styles.modal}
								overlayClassName={styles.overlay}
								contentLabel="Example Modal"
								shouldCloseOnEsc={true}  
							>
								<img src="/cancel.svg"></img>
								<h1>Excluir Prêmio</h1>
								<p>Tem certeza que você deseja excluir este prêmio?</p>
								<div className={styles.rowButton}>
									<button type='button' className={styles.cancel} onClick={handleCloseModal}>Cancelar</button>
									<button type='button' className={styles.shutDown} onClick={handleDeleteAward}>Sim, excluir</button>
								</div>
							</Modal>
						</section>
					</div>
				</div>
			</div>
		)
	}
}

export async function getServerSideProps(ctx) {
	const { crewId, awardId } = ctx.params;

	try {
		let { data: crew } = await api.get(`/crew/${crewId}`);
		let { data: award } = await api.get(`/award/${awardId}`);

		return {
			props: {
				crew,
				award
			}
		}
	} catch (error) {
		return {
			notFound: true
		}
	}
}
