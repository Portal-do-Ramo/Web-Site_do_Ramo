import { useState } from 'react';

import { FaLinkedinIn } from 'react-icons/fa';
import { FiMail, FiMapPin, FiUsers } from 'react-icons/fi';
import { MdCopyAll, MdDone } from 'react-icons/md';
import { BsInstagram } from 'react-icons/bs';

import Map from '../Map';

import styles from './styles.module.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function ContactButton() {
  const [buttonSelected, setButtonSelected] = useState(0);
  const [isEmailCopied, setIsEmailCopied] = useState(false);

  function handleCopyEmail() {
    navigator.clipboard.writeText('gp.ramocefetrj@gmail.com');

    setIsEmailCopied(true);

    setTimeout(() => {
      setIsEmailCopied(false);
    }, 2000);
  }

  return (
    <div className={styles.contactUsContent}>
      <div className={styles.contactOptions}>
        <button
          className={styles.buttonContainer}
          id={buttonSelected === 0 ? styles.activedButton : ''}
          onClick={() => setButtonSelected(0)}
        >
          <FiMapPin />
          <p>R. Gen. Canabarro, 485 - Maracanã, RJ</p>
        </button>

        <button
          className={styles.buttonContainer}
          id={buttonSelected === 1 ? styles.activedButton : ''}
          onClick={() => setButtonSelected(1)}
        >
          <FiUsers className={styles.icon} />
          <p>Nossas Redes</p>
        </button>

        <button
          className={styles.buttonContainer}
          id={buttonSelected === 2 ? styles.activedButton : ''}
          onClick={() => setButtonSelected(2)}
        >
          <FiMail className={styles.icon} />
          <p>E-mail</p>
        </button>
      </div>

      <Map actived={buttonSelected === 0 ? true : false} />

      <div
        className={styles.social}
        id={buttonSelected !== 1 ? styles.disableSocial : ''}
      >
        <button
          className={styles.socialButton}
          onClick={() =>
            window.open('https://www.linkedin.com/company/ieeecefet', '_blank')
          }
        >
          <span id={styles.linkedin}>
            <FaLinkedinIn className={styles.icon} />
          </span>
          Linkedin
        </button>

        <button
          className={styles.socialButton}
          onClick={() =>
            window.open('https://www.instagram.com/ieeecefet', '_blank')
          }
        >
          <span id={styles.instagram}>
            <BsInstagram className={styles.icon} />
          </span>
          Instagram
        </button>
      </div>

      <section
        className={styles.mail}
        id={buttonSelected !== 2 ? styles.disableMail : ''}
      >
        <article
          className={styles.copyEmailButton}
          onClick={() => handleCopyEmail()}
        >
          <img src='/Envelope.svg' alt='Envelope Ilustração' />
          <p>gp.ramocefetrj@gmail.com</p>
          {isEmailCopied ? <MdDone size={30} /> : <MdCopyAll size={30} />}
        </article>
      </section>
    </div>
  );
}
