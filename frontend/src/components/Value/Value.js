import styles from './value.module.scss'

export default function Value({props}){
    return(
        <div className={styles.valueContainer}>
            <img src={props.img}/>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </div>
    )
} 