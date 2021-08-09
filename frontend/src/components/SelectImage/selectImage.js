import styles from './SelectImage.module.scss'
import {useState} from "react";

export default function MktImageSection() {
    const [images, setImages] = useState([])
    const [previewImages, setPreviewImages] = useState([])
    const imagesArray = []

    function handleSelectImages(event) {
        if(!event.target.files) return
        
        const selectedImages = Array.from(event.target.files)
        setImages(selectedImages)
        const selectedImagesPreview = selectedImages.map(image => {
            return URL.createObjectURL(image)
        })
        imagesArray.push()
        setPreviewImages(selectedImagesPreview)
    }

    return(
        <div className={styles.imageCard}>
            {previewImages.length == 0 ? (
                 <label htmlFor="image[]" className={styles.newImage}>
                 <div className={styles.cross1}></div>
                 <div className={styles.cross2}></div>
             </label>
            ) : 
            previewImages.map(image => {
                return (
                    <img className={styles.image} key={image} src={image} />
                )
            }
            )}
           
            {/* input escondido */}
            <input onChange={handleSelectImages} type="file" id="image[]"  />
            <p>capa</p>
        </div>
    )
}