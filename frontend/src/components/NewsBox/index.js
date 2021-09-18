import Link from "next/link";
import Image from "next/image";
import { formatDistance } from "date-fns";
import styles from "./styles.module.scss";
import ptBR from "date-fns/locale/pt-BR";

export default function NewsBox(props) {
  const noticias = props.noticias;
  function differenceBtwTime(time) {
    const minutes = formatDistance(new Date(time), new Date(), {
      addSuffix: false,
      locale: ptBR,
    });
    return minutes;
  }

  return (
    <div className={styles.News}>
      <table>
        <tr>
          <td>
            <div className={styles.img}>
              <Image
                src={noticias.img}
                width={650}
                height={450}
                objectFit="cover"
              />
            </div>
          </td>
          <td>
            <div className={styles.newsInfo}>
              <Link href={`/post/${noticias.id}`}>
                <a>
                  <h1>{noticias.title}</h1>
                </a>
              </Link>
              <p>{noticias.description}</p>
              <p className={styles.time}>
                Há {differenceBtwTime(noticias.publishedAt)}
              </p>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
}
