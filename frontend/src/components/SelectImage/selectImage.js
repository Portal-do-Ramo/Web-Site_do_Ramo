import styles from './selectImage.module.scss'

export default function MktImageSection() {

    return(
        <div className={styles.imageCard}>
            <label htmlFor="image[]" className={styles.newImage}>
                <div className={styles.cross1}></div>
                <div className={styles.cross2}></div>
            </label>

            {/* input escondido */}
            <input multiple onChange={handleSelectImages} type="file" id="image[]"  />
            <p>capa</p>
        </div>
    )
}