import Link from 'next/link';
import Image from 'next/image';

import styles from '../styles/index.module.scss';

export default function Home() {
  return (
    <div id={styles.page}>
      <div id={styles.main_contender}>
        <h1>Nossa História</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
        odio elementum bibendum aliquam. Vel, tempor tincidunt enim, 
        eu. Ut non dui nulla massa viverra. Pellentesque id integer 
        vulputate nulla sed in aenean. Pulvinar suspendisse vitae etiam 
        sem natoque aliquam amet pulvinar velit. Aliquet tempor iaculis 
        curabitur cursus libero. Cursus odio nunc ipsum ipsum nunc. 
        Mauris mi fringilla nibh a. Cursus tincidunt fames faucibus id 
        iaculis egestas malesuada dis sed. Aliquet vel eu in arcu, 
        adipiscing adipiscing luctus ligula tellus.
      
        Mi massa urna, commodo in dignissim. Varius neque quam in 
        nullam ullamcorper. Ac vestibulum, posuere blandit mauris. 
        Semper accumsan, arcu sit egestas phasellus in senectus etiam 
        et. Scelerisque in a quisque mattis iaculis pellentesque bibendum 
        bibendum diam. Imperdiet velit ultricies vestibulum aenean 
        cursus iaculis eget. Lacus, aliquet tellus viverra volutpat aliquam 
        mauris sed hendrerit cursus. Laoreet maecenas aenean facilisi 
        rhoncus. A mi, faucibus eu tortor iaculis fringilla nullam sed 
        platea. Et arcu sed auctor vel. Quis sagittis, eros dolor facilisi.</p>
        <div>
          <Link href="#">
            <a>Saiba mais</a>
          </Link>
          <Image src="/../../public/right-arrow.png" width={50} height={50}/>
        </div>
      </div>
      <h3>Equipes</h3>
      <section>
        <div>
          <a>
            <img src="../../WolfByte.png"/>
            <span>Wolfbyte</span>
          </a>
        </div>
        <div>
          <a>
            <img src="../../BotzLogo.png"/>
            <span>WolfBotz</span>
          </a>
        </div>
        <div>
          <a>
            <img src="../../PowerLogo.png"/>
            <span>WolfPower</span>
          </a>
        </div>
        <div>
          <a>
            <img src="../../RocketLogo.png"/>
            <span>WolfRocket</span>
          </a>
        </div>
        <div>
          <a>
            <img src="SocialLogo.png"/>
            <span>SocialWolf</span>
          </a>
        </div>
        <div>
          <a>
            <img src="WieLogo.png"/>
            <span>WIE</span>
          </a>
        </div>
        <div>
          <a>
            <img src="GestaoLogo.png"/>
            <span>Gestão</span>
          </a>
        </div>
        <div>
          <a>
            <img src="MarketingLogo.png"/>
            <span>Marketing</span>
          </a>
        </div>
      </section>
      <section>
        <h3>Parcerias</h3>
        <div>
          <a>
            <img src="#"></img>
            <span>WFF</span>
          </a>
        </div>
        <div>/
          <a>
            <img src="#"></img>
            <span>Lascou-se</span>
          </a>
        </div>
        <div>
          <a>
            <img src="#"></img>
            <span>Ardidas</span>
          </a>
        </div>
        <div>
          <a>
            <img src="#"></img>
            <span>Apple</span>
          </a>
        </div>
        <div>
          <a>
            <img src="#"></img>
            <span>Pumba</span>
          </a>
        </div>
        <div>
          <a>
            <img src="#"></img>
            <span>Perdidão</span>
          </a>
        </div>
      </section>
    </div>
  )
}
