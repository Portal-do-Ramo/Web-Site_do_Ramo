import {useState} from "react";
import NavBar from "../../../components/NavBar/NavBar";
import styles from '../../../styles/equipesCadastrar.module.scss'

export default function Cadastrar(){

  const [title,setTitle] = useState('')
  const [text, setText] = useState('')
  const [images,setImages] = useState(null)

  function handleSubmit(event, form) {
    event.preventDefault()
    console.log({ title, text, images })
  }

  function handleSelectImages(event) {
    if(!event.target.files) {
      return
    }
    setImages(event.target.files)
  }

  return(
    
    <div className={styles.container}>
      <NavBar/>

      <form id={styles.content} onSubmit={handleSubmit}>
        
        <fieldset id={styles.fieldset}>
          <legend id={styles.legend} >Equipes</legend>

          <label class={styles.inputLabel}>Nome da equipe</label>
          <input id={styles.inputTitle} onChange={event => setTitle(event.target.value)} />

          <label class={styles.inputLabel}>Texto</label>
          <textarea id={styles.inputTextarea} onChange={event => setText(event.target.value)} />

          <label class={styles.inputLabel}>Logo</label>
          <div>
            <label htmlFor="imgFile" id={styles.imgFileBtn}>Escolher ficheiro</label>
            <input onChange={handleSelectImages} type="file" id="imgFile" class={styles.imgFile} />
          </div>
                  
          <img src={images} />
              
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