import {useState} from "react";
import NavBar from "../../../components/NavBar/NavBar";
import styles from '../../../styles/blogCadastrar.module.scss'


export default function cadastrar(){
  const [title,setTitle] = useState('')
  const [resume,setResume] = useState('')
  const [images,setImages] = useState([])
  const [postText,setPostText] = useState('')
  
  
  return(
    <div className={styles.container}>
      <NavBar/>
      <form onSubmit={handleSubmit} id={styles.content}>
        
        {/* Sessão de inputs */}
        <fieldset id={styles.fieldset}>
            <legend id={styles.label} >Posts</legend>

            <h1 id={styles.inputLabel}>Título</h1>
            <input id={styles.input} value={title} 
            onChange={event => setTitle(event.target.value)} />

            <h1 id={styles.inputLabel}>Resumo</h1>
            <input id={styles.input} value={resume} 
            onChange={event => setResume(event.target.value)} />

            <h1 id={styles.inputLabel}>Imagens</h1>

                <div className={styles.imageCard}>
                   <label htmlFor="image[]" className={styles.newImage}>
                    <div className={styles.cross1}></div>
                    <div className={styles.cross2}></div>
                   </label>

                   <input multiple onChange={handleSelectImages} type="file" id="image[]"  />
                   <p>capa</p>
                </div>

            <h1 id={styles.inputLabel}>Texto do post</h1>
            <input id={styles.input} value={postText} 
            onChange={event => setPostText(event.target.value)} />
        </fieldset>

        {/* Botões */}
        <div id={styles.btnContainer}>
            <button type="button" id={styles.cancelBtn}>
                <p>cancelar</p>
            </button>
            <button type="submit" id={styles.saveBtn}>
                <p>salvar</p>
            </button>
        </div>
      </form>
    </div>
  )
}