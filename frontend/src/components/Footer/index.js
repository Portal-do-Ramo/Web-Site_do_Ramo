import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoRamo}>
        <img src='/logoPrincipal.svg' alt='Logo do Ramo' />
        <span>
          Ramo Estudantil <br /> IEEE CEFET-RJ
        </span>
      </div>

      <div className={styles.addressContainer}>
        <span> Endereço </span>
        <p> Rua Gen. Canabarro, 485 – Maracanã, Rio de Janeiro – RJ </p>
      </div>

      <div className={styles.crewsContainer}>
        <img src='/WIE_logo.svg' />
        <img src='/Wolfbyte_logo.svg' />
        <img src='/Socialwolf_logo.svg' />
        <img src='/Rocketwolf_logo.svg' />
        <img src='/Wolfpower_logo.svg' />
        <img src='/Wolfbotz_logo.svg' />
        <img src='/Gestao_logo.svg' />
        <img src='/Marketing_logo.svg' />
      </div>
    </footer>
  );
}
