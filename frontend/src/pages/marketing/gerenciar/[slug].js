import { useRouter } from "next/router"
import Gerenciar from "../../../components/GerenciarMarketing"
import NavBar from "../../../components/NavBar"
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