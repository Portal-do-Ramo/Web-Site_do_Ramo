import Image from "next/image";
import styles from "./styles.module.scss";
import Link from "next/link";

const edit = [
  {
    id: 1,
    title: "Blog",
  },
  {
    id: 2,
    title: "Equipes",
  },
  {
    id: 3,
    title: "Projetos",
  },
];

export default function NavBar() {
  return (
    <div className={styles.all}>
      <div className={styles.title}>
        <Image src="/Ramo_logo.svg" width="auto" height="70%" />
        <div className={styles.title2}>
          <p>Admin</p>
          <p>Site do Ramo</p>
        </div>
      </div>
      <div className={styles.edit}>
        {edit.map((edit) => (
          <div key={edit.id}>
            <h1>{edit.title}</h1>
            <div className={styles.options}>
              <Link href="/">
                <a>
                  <p>Cadastrar</p>
                </a>
              </Link>
              <Link href={`/marketing/gerenciar/${edit.title}`}>
                <a>
                  <p>Gerenciar</p>
                </a>
              </Link>
            </div>
          </div>
        ))}
        <h1>PSE</h1>
        <Link href="/">
          <a>
            <p className={styles.options}>Editar</p>
          </a>
        </Link>
      </div>
    </div>
  );
}
