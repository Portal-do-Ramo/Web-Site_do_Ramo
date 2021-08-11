import {useContext, useState} from "react";
import NavBar from "../../../components/NavBar/NavBar";
import SelectImage from "../../../components/SelectImage/SelectImage";
import styles from '../../../styles/blogCadastrar.module.scss'
import api from '../../../services/api'
import { Context } from "../../../contexts/Context";

export default function cadastrar(){
  const [title,setTitle] = useState('');
  const [resume,setResume] = useState('');
  const [postText,setPostText] = useState('');
  const {images,setImages,setPreviewImages} = useContext(Context);
  
  async function handleSubmit(event) {
    event.preventDefault()

    const data = new FormData();
    data.append('title', title);
    data.append('resume', resume);
    data.append('body', postText);
    //mudar o valor abaixo p/ id de um user cadastrado no seu bd
    data.append('user_id', '7d16dae6-377c-40e5-a3a9-1ac33cda5921'); 
    
    images.forEach(image => {
      data.append('img', image);
    })
    
    await api.post('/news', data);

    setTitle('');
    setResume('');
    setPostText('');
    setImages([]);
    setPreviewImages([]);
  }

  return(
    <div className={styles.container}>
      <NavBar/>
      <form onSubmit={handleSubmit} id={styles.content}>
        
        {/* Sessão de inputs */}
        <fieldset id={styles.fieldset}>
            <legend id={styles.label} >Posts</legend>

            <h1 className={styles.inputLabel}>Título</h1>
            <input id={styles.inputTitle} value={title} 
            onChange={event => setTitle(event.target.value)} />

            <h1 className={styles.inputLabel}>Resumo</h1>
            <textarea id={styles.resumeInput} value={resume} 
            onChange={event => setResume(event.target.value)} />
   
            <h1 className={styles.inputLabel}>Imagens</h1>
            <div className={styles.imagesContainer}>
              <SelectImage index={0} />
              <SelectImage index={1} />
              <SelectImage index={2} />
            </div>

            <h1 className={styles.inputLabel}>Texto do post</h1>
            <textarea id={styles.textPostInput} value={postText} 
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

