import { useRouter } from "next/router"
import ManageContainer from "../../../components/MarketingManager"
import NavBar from "../../../components/NavBar"
import styles from "./styles.module.scss"
import api from '../../../services/api'

export default function Manage({ crews }){
  const router = useRouter();
  
  const name = router.query.slug;

  return (
    <div className={styles.all}>
      <NavBar/>
      <ManageContainer name={name} equipes={crews}/>
    </div>
  )
}

export const getServerSideProps = async () => {
  let {data : crews} = await api.get("/crews");

  return {
    props: {
      crews
    }
  }
}