import styles from './CrewCard.module.scss'
import Link from "next/link"

export default function Card({ index, image, name }) {
    return (           
        <div className={styles.cards}>
            <Link
                href={{ 
                    pathname:"/equipes", 
                    query: { crewIndex: index } 
                }}
            >
                <a>
                    <img src={image}/>
                    <p>{name}</p>
                </a>
            </Link>
        </div>
    )
}