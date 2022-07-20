import { useEffect } from 'react';
import { useRouter } from "next/router";

import api from '../../../services/api';

import Page1 from './_page1';
import Page2 from './_page2';
import Page3 from './_page3';
import PSEFormHeader from '../../../components/pseFormHeader';
import styles from '../../../styles/pseCadastro.module.scss';
import Head from 'next/head';


export default function cadastro({ crewsNames }) {
  const router = useRouter();
  const { page } = router.query;

  useEffect(() => {
    if (page && page !== "1" && page !== "2" && page !== "3") {
      router.push("/PSE/cadastro?page=1");
    }
  }, [page]);

  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>Formulário PSE | IEEE CEFET-RJ</title>
        <link rel="shortcut icon" href="/Ramo_logo.svg" />
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

export const getStaticProps = async () => {
  let { data } = await api.get("/crews");

  let crewsNames = data.map( crew => {
    return crew.name;
  });

  return {
    props: {
      crewsNames
    },
    revalidate: 24 * 60 * 60 // 24 Horas
  }
}