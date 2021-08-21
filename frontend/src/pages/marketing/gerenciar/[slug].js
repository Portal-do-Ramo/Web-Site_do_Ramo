import { useRouter } from "next/router"
import Gerenciar from "../../../components/GerenciarMarketing/index"
import NavBar from "../../../components/NavBar/index"
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