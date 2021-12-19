import styles from './CrewCard.module.scss'

export default function Card({ dataIsFetched, image, name}) {
    if(dataIsFetched) {
        return (           
            <div className={styles.cards}>
                <a href="/equipes">
                    <img src={image}/>
                    <p>{name}</p>
                </a>
            </div>
        )
    } else {
        return (
            <div className={styles.cards} />
        )
    }
    
}