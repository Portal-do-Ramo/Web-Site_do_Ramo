import styles from '../../../styles/pseCadastro.module.scss';
import PSEFormHeader from '../../../components/pseFormHeader';
import { useRouter } from "next/router";
import Page1 from './_page1';
import Page2 from './_page2';
import { useEffect } from 'react';

export default function cadastro() {
  const router = useRouter()
  const { page } = router.query;

  useEffect(() => {
    if (page && page !== "1" && page !== "2" && page !== "3") {
      router.push("/PSE/cadastro?page=1");
    }
  }, [page]);
  

  return (
    <section className={styles.container}>
      <PSEFormHeader page={page}/>

      { page === "1" && <Page1/> }
      { page === "2" && <Page2/> }
      {/* { page === "3" && <Page3/> } */}

    </section>
  )
}