import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoRamo}>
        <img src="/Ramo_logo.svg" alt="logo" />
        <span>
          Ramo Estudantil <br /> IEEE CEFET-RJ
        </span>
      </div>

      <div className={styles.addressContainer}>
        <span> Endereço </span>
        <p> Rua Gen. Canabarro, 485 – Maracanã, Rio de Janeiro – RJ </p>
        <p> (21) 4002-8922 </p>
      </div>

      <div className={styles.crewsContainer}>
        <img src="/WIE_logo.svg" />
        <img src="/Wolfbyte_logo.svg" />
        <img src="/Socialwolf_logo.svg" />
        <img src="/Rocketwolf_logo.svg" />
        <img src="/WolfPower_logo.svg" />
        <img src="/WolfBotz_logo.svg" />
        <img src="/Gestao_logo.svg" />
        <img src="/Marketing_logo.svg" />
      </div>
    </footer>
  );
}
