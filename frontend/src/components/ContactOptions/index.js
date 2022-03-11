import { useState } from 'react'

import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { FiMail, FiMapPin, FiUsers } from 'react-icons/fi';
import { BsInstagram } from 'react-icons/bs';

import Map from '../Map'

import styles from './styles.module.scss'
import 'mapbox-gl/dist/mapbox-gl.css';

export default function ContactButton({ text, image }) {
    const [buttonSelected, setButtonSelected] = useState(0);

    return (           
        <div className={styles.contactUsContent}>
            <div className={styles.contactOptions}>
                <button 
                    className={styles.buttonContainer}
                    id={buttonSelected === 0 && styles.activedButton}
                    onClick={() => setButtonSelected(0)}
                >
                    <FiMapPin/>
                    R. Gen. Canabarro, 485 - Maracanã, RJ
                </button>

                <button 
                    className={styles.buttonContainer}
                    id={buttonSelected === 1 && styles.activedButton} 
                    onClick={() => setButtonSelected(1)}
                >
                    <FiUsers className={styles.icon}/>
                    Nossas Redes
                </button>

                <button 
                    className={styles.buttonContainer}
                    id={buttonSelected === 2 && styles.activedButton} 
                    onClick={() => setButtonSelected(2)}
                >
                    <FiMail className={styles.icon}/>
                    E-mail
                </button>
            </div>

            <Map actived={buttonSelected === 0 ? true : false}/>

            <div className={styles.social} id={buttonSelected !== 1 && styles.disableSocial}>
                <button className={styles.socialButton}>
                    <span id={styles.linkedin}>
                        <FaLinkedinIn className={styles.icon}/>
                    </span>   
                    Linkedin
                </button>

                <button className={styles.socialButton}>
                    <span id={styles.facebook}>
                        <FaFacebookF className={styles.icon}/>
                    </span>   
                    Facebook
                </button>

                <button className={styles.socialButton}>
                    <span id={styles.instagram}>
                        <BsInstagram className={styles.icon}/>
                    </span>   
                    Instagram
                </button>
            </div>

            <section className={styles.mail} id={buttonSelected !== 2 && styles.disableMail}>
                <p>AINDA NÃO DEFINIDO</p>
            </section>
        </div>
        
    )
}