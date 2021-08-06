import styles from "./styles.module.scss";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";

const ativos = [
  {
    id: 1,
    name: "Eae pessoal tudo bem",
  },
  {
    id: 2,
    name: "Aqui quem fala é edu",
  },
  
];

const excluidos = [
  {
    id: 1,
    name: "A carta",
  },
  {
    id: 2,
    name: "Telegrama",
  },
  {
    id: 3,
    name: "Gamei",
  },
  {
    id: 4,
    name: "Nada vai separar",
  },
  {
    id: 5,
    name: "Só de olhar",
  },
  {
    id: 6,
    name: "Que situação",
  },
];

export default function Gerenciar({name}) {
  const [searchQuery, setSearchQuery] = useState("");
  

  const filterElements = (elements, searchQuery) => {
    if (!searchQuery) {
      return elements;
    }
    return elements.filter((elements) => {
      const notName = elements.name.toLowerCase();
      return notName.includes(searchQuery);
    });
  };
  const filteredActive = filterElements(ativos, searchQuery);
  const filteredExcluded = filterElements(excluidos, searchQuery);

  const [isActive, setIsActive] = useState(true);

  return (
    <div className={styles.all}>
      <div className={styles.title}>
        <h1>{name}</h1>
      </div>
      <div className={styles.manager}>
        <div className={styles.search}>
          <div className={styles.searchBar}>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          {/*<div className={styles.searchButton}>
            <p>Buscar</p>
          </div>*/}
        </div>
        <div className={styles.elementsManager}>
          <div className={styles.managingButtons}>
            <div
              className={isActive ? styles.activeButton : styles.button}
              onClick={() => setIsActive(true)}
            >
              <p>Ativos</p>
            </div>
            <div
              className={isActive ? styles.button : styles.activeButton}
              onClick={() => setIsActive(false)}
            >
              <p>Excluído</p>
            </div>
          </div>

          {isActive ? (
            <div className={styles.scroll}>
              {filteredActive.map((element) => (
                <div className={styles.elements} key={element.id}>
                  <p>{element.name}</p>
                  <div className={styles.edit}>
                    <img src="/edit.svg" />
                    <img src="/delete.svg" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.scroll}>
              {filteredExcluded.map((element) => (
                <div className={styles.elements} key={element.id}>
                  <p>{element.name}</p>
                  <div className={styles.edit}>
                    <img src="/edit.svg" />
                    <img src="/recover.svg"/>
                    <img src="/delete.svg" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles.backButton}>
        <p>Voltar</p>
      </div>
    </div>
  );
}
