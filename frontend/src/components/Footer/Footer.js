import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.ramo}>
        <img src="/Ramo_Branco 2.png" alt="logo" />
        <h1>Ramo Estudantil <br/> IEEE CEFET-RJ</h1>
        
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
        <table>
          <tr>
            <img src="/wie.svg" />
            <img src="/wolfbyte.svg" />
          </tr>
          <tr>
            <img src="/Social.svg" />
            <img src="/Rocket.svg" />
          </tr>
          <tr>
            <img src="/Power.svg" />
            <img src="/Botz.svg" />
          </tr>
          <tr>
            <img src="/Gestao.svg"/>
            <img src="/Marketing.svg"/>
          </tr>
        </table>
        
      </div>
      <div className={styles.info}>
        <h1>Contatos </h1>
        <p>Av. Maracanã – Maracanã, Rio de Janeiro – RJ</p>
        <p>0000-0000</p>
        <p>iadobitcoin@gmail.com</p>
        <a target="_blank" href="https://pt-br.facebook.com/ramocefet/">
          <img src="/Facebook (2).svg"/>
        </a>
        <a target="_blank" href="https://www.instagram.com/ramocefet/">
          <img src="/Instagram (2).svg"/>
        </a>
        <a target="_blank" href="https://www.linkedin.com/company/ramocefet/">
          <img src="/Linkedin (2).svg"/>
        </a>


        <p>Desenvolvido por Ticoliro, Julioboladin2001,
        Thiaguin, Pedroza, Vinicin, Japa, Natanzon,
        Gabrielzin do Violino</p>
      </div>
    </div>
  )
}