import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.ramo}>
        <div id="wrapper">
          <img src="/Ramo_logo.svg" alt="logo" />
          <h1>
            Ramo Estudantil <br /> IEEE CEFET-RJ
          </h1>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed odio
          elementum bibendum aliquam. Vel, tempor tincidunt enim, eu. Ut non dui
          nulla massa viverra. Pellentesque id integer vulputate nulla sed in
          aenean. Pulvinar suspendisse vitae etiam sem natoque aliquam amet
          pulvinar velit. Aliquet tempor iaculis curabitur cursus libero. Cursus
          odio nunc ipsum ipsum nunc. Mauris mi fringilla nibh a. Cursus
          tincidunt fames faucibus id iaculis egestas malesuada dis sed. Aliquet
          vel eu in arcu, adipiscing adipiscing luctus ligula tellus.
        </p>
      </div>

      <div className={styles.equipes}>
        <table>
          <tr>
            <img src="/WIE_logo.svg" />
            <img src="/Wolfbyte_logo.svg" />
          </tr>
          <tr>
            <img src="/Socialwolf_logo.svg" />
            <img src="/Rocketwolf_logo.svg" />
          </tr>
          <tr>
            <img src="/WolfPower_logo.svg" />
            <img src="/WolfBotz_logo.svg" />
          </tr>
          <tr>
            <img src="/Gestao_logo.svg" />
            <img src="/Marketing_logo.svg" />
          </tr>
        </table>
      </div>

      <div className={styles.info}>
        <h1>Contatos </h1>
        <p>Av. Maracanã – Maracanã, Rio de Janeiro – RJ</p>
        <p>0000-0000</p>
        <p>iadobitcoin@gmail.com</p>
        <div className={styles.social}>
          <a target="_blank" href="https://pt-br.facebook.com/ramocefet/">
            <img src="/Facebook.svg" />
          </a>
          <a target="_blank" href="https://www.instagram.com/ramocefet/">
            <img src="/Instagram.svg" />
          </a>
          <a target="_blank" href="https://www.linkedin.com/company/ramocefet/">
            <img src="/Linkedin.svg" />
          </a>
        </div>

        <p>
          Desenvolvido por Ticoliro, Julioboladin2001, Thiaguin, Pedroza,
          Vinicin, Japa, Natanzon, Gabrielzin do Violino, GuiGuiZin
        </p>
      </div>
    </footer>
  );
}
