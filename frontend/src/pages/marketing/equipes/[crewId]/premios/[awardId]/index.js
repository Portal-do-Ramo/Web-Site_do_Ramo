import NavBar from "../../../../../../components/NavBar";
import api from "../../../../../../services/api";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function premio({ award }){ 
    const router = useRouter();

    function handleSelectOption(option) {
        router.push(`${crew.id}/${option}`);    
    }

    useEffect(() => {
        console.log(award);
    }, [])

  return (
    <div className={styles.all}>
      <NavBar page="equipes"/>

      <div className={styles.pageContent}>
        
      </div>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { crewId, awardId } = ctx.params;

  try {
    let { data } = await api.get(`/crews/${crewId}`);

    let award = data.awards.find(award => award.id === Number(awardId));
    
    if (!award) {
      throw new Error("id do projeto não existe");
    }

    return {
      props: {
        award
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
