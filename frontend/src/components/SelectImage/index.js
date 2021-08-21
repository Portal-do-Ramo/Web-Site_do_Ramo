import styles from './SelectImage.module.scss'
import { Context } from '../../contexts/Context';
import { useContext } from "react";

export default function SelectImage({index}) {
    const {handleSelectImages, previewImages} = useContext(Context);
    let previewImage = '';

    if(!!previewImages) {
        previewImage = previewImages[index];
    }
        

    return(
        <div className={styles.imageCard}>
            {!previewImage ? (
                 <label htmlFor="image" className={styles.newImage}>
                 <div className={styles.cross1}></div>
                 <div className={styles.cross2}></div>
             </label>
            ) : 
              <img className={styles.previewImage} key={previewImage} src={previewImage} />
            }
           
            {/* input escondido */}
            <input onChange={handleSelectImages} type="file" id="image"  />
            <p>capa</p>
        </div>
    )
}