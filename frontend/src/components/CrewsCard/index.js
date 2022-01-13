import styles from './CrewCard.module.scss'

export default function Card({ image, name }) {
    return (           
        <div className={styles.cards}>
            <a href="/equipes">
                <img src={image}/>
                <p>{name}</p>
            </a>
        </div>
    )
}