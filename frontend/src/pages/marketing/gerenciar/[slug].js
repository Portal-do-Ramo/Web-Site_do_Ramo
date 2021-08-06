import { useRouter } from "next/router"
import Gerenciar from "../../../components/GerenciarMarketing/gerenciar"
import NavBar from "../../../components/NavBar/NavBar"
import styles from "./styles.module.scss"

export default function Manage(){
  const router = useRouter();
  const name = router.query.slug;
  return (
    <div className={styles.all}>

      <NavBar/>
      <Gerenciar name = {name}/>
    </div>
  )
}