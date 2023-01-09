import Header from "../components/Header";
import Footer from "../components/Footer";
import CrewsCard from "../components/CrewsCard";

import Image from "next/image";

import api from '../services/api'

import styles from "../styles/index.module.scss";

export default function Home({ crews }) {

	return (
		<div className={styles.container}>
			<Header page="inicio">
				<div className={styles.wolfImageContainer}>
					<Image
						src="/seu_pai.svg"
						alt="Lobo do Ramo IEEE CEFET-RJ"
						width={300}
						height={300}
					/>
				</div>
			</Header>
			
			<div className={styles.page_container}>
				<section className={styles.text_container}>
					<div className={styles.ourStory}>
						<h1>Nossa História</h1>

						<p>
							O Ramo Estudantil IEEE teve um inicio humilde em 2004, mas voltou mais forte em 2016, desde então crescendo passo a passo.
							Começou focado somente na parte de programação computacional, mas conforme o tempo expandiu as áreas de atuação, criando 
							equipes para cada uma dessas áreas.
							<br />
							<br />
							Buscamos auxiliar no crescimento das pessoas tanto como profissional como quanto pessoa, com projetos em equipe que 
							aceitam qualquer nível de experiência, desde que esteja disposto/a a aprender.
						</p>
					</div>

					<div className={styles.main_container}>
						<a href="/sobre" className={styles.button}>
							<p>Saiba mais</p>
							<Image src="/right-arrow.svg" width={20} height={20} />
						</a>
					</div>
				</section>

				<section className={styles.crew_content}>
					<article>
						<h3>Equipes</h3>

						<div className={styles.logo_content}>
						{
							crews.map((crew, index) => {
								return (
									<CrewsCard
										key={crew.id}
										index={index} 
										name={crew.name} 
										image={crew.imageURL} 
									/>
								)
							})
						}
						</div>
					</article>
				</section>
				
				<section className={styles.join_us}>
					<article>
						<img src="/pessoas_quebra_cabeca.svg" alt="ilustração de uma equipe trabalhando junto" />

						<div>
							<span>Faça parte da nossa equipe!</span>
							<p>Se você é estudante de graduação do CEFET-RJ, se inscreva no nosso processo seletivo para trabalhar junto com o maior projeto de extensão do CEFET-RJ. </p>
							<a href="/PSE" className={styles.button}>
								<p>Se inscreva já</p>
							</a>
						</div>
					</article>
				</section>
			</div>
			<Footer />
		</div>
	);
}

export const getStaticProps = async () => {
  let {data : crews} = await api.get("/crews");

  return {
    props: {
      crews
    },
    revalidate: 60 * 60 * 4 // 4 Horas
  }
}
