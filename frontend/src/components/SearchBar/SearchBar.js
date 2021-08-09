
import styles from './styles.module.scss'

export default function SearchBar ({searchQuery , setSearchQuery }){
  
  return(
      <form  className={styles.form}>
        <input type="text" value={searchQuery} onChange={(event)=>setSearchQuery(event.target.value)}/>
        <img src="/search.svg"/>
      </form>
  )
}