import NavBar from "../../../../../../components/NavBar";
import api from "../../../../../../services/api";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function projeto({ project }){ 
    const router = useRouter();

    function handleSelectOption(option) {
        router.push(`${crew.id}/${option}`);    
    }

    useEffect(() => {
        console.log(project);
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
  const { crewId, projectId } = ctx.params;

  try {
    let { data } = await api.get(`/crews/${crewId}`);

    let project = data.projects.find(project => project.id === Number(projectId));

    if (!project) {
        throw new Error("id do projeto não existe");
    }
    
    return {
      props: {
        project
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
