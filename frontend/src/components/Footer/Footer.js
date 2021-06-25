import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.ramo}>
        <img src="/Ramo_Branco 2.png" alt="logo" />
        <h1>Ramo Estudantil </h1>
        <h1>IEEE CEFET-RJ</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          odio elementum bibendum aliquam. Vel, tempor tincidunt enim,
          eu. Ut non dui nulla massa viverra. Pellentesque id integer
          vulputate nulla sed in aenean. Pulvinar suspendisse vitae etiam
          sem natoque aliquam amet pulvinar velit. Aliquet tempor iaculis
          curabitur cursus libero. Cursus odio nunc ipsum ipsum nunc.
          Mauris mi fringilla nibh a. Cursus tincidunt fames faucibus id
          iaculis egestas malesuada dis sed. Aliquet vel eu in arcu,
          adipiscing adipiscing luctus ligula tellus.Aliquet vel eu in arcu,
          adipiscing adipiscing luctus ligula tellus.
        </p>
      </div>
      <div className={styles.equipes}>
        <img src="WieLogo.png" />
        <img src="../../../WolfByte.png" />
        <img src="SocialLogo.png" />
        <img src="../../RocketLogo.png" />
        <img src="../../PowerLogo.png" />
        <img src="../../BotzLogo.png" />
      </div>
      <div className={styles.info}>
        <h1>Contatos </h1>
        <p>Av. Maracanã – Maracanã, Rio de Janeiro – RJ</p>
        <p>0000-0000</p>
        <p>iadobitcoin@gmail.com</p>

        <p>Desenvolvido por Ticoliro, Julioboladin2001,
        Thiaguin, Pedroza, Vinicin, Japa, Natanzon,
        Gabrielzin do Violino</p>
      </div>
    </div>
  )
}