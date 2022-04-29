import NavBar from "../../../../../../../components/NavBar";
import api from "../../../../../../../services/api";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

export default function projetoEditar({ crew }){ 
    const router = useRouter();

    function handleSelectOption(option) {
      router.push(`${crew.id}/${option}`);    
    }

    return (
      <div className={styles.all}>
        <NavBar page="equipes"/>
      </div>
    )
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
