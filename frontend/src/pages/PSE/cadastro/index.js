import { useEffect } from 'react';
import { useRouter } from "next/router";

import api from '../../../services/api';

import Page1 from './_page1';
import Page2 from './_page2';
import Page3 from './_page3';
import PSEFormHeader from '../../../components/PSEFormHeader';
import styles from '../../../styles/pseCadastro.module.scss';
import Head from 'next/head';
import { isBefore } from 'date-fns';

export default function cadastro({ hasActivePSE, crewsNames }) {
	const router = useRouter();
	const { page } = router.query;

	useEffect(() => {
		if (!hasActivePSE) {
			router.replace("/PSE");
		}
	}, [])

	useEffect(() => {
		if (page && page !== "1" && page !== "2" && page !== "3") {
			router.push("/PSE/cadastro?page=1");
		}
	}, [page]);

	if (!hasActivePSE) {
		return <></>
	}

	return (
		<div className={styles.pageContainer}>
			<Head>
				<title>Formulário PSE | IEEE CEFET-RJ</title>
			</Head>

			<section className={styles.container}>
				<PSEFormHeader page={page}/>

				{ page === "1" && <Page1/> }
				{ page === "2" && <Page2/> }
				{ page === "3" && <Page3 crewsNames={crewsNames}/> }

			</section>
		</div>
	)
}

export const getServerSideProps = async (ctx) => {
	const { data } = await api.get("/crews");
	
	let crewsNames;
	
	try {
		crewsNames = data.map( crew => {
			return crew.name;
		});
	} catch (error) {
		crewsNames = [];
	}

	let hasActivePSE = false;

	try {
		const {data} = await api.get("/pse");

		if (!isBefore(new Date(), new Date(data.start))) {
			hasActivePSE = true;
		}

	} catch (error) {
		hasActivePSE = false;
	}

	return {
		props: {
			hasActivePSE,
			crewsNames
		}
	}
}