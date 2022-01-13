import styles from "./styles.module.scss";
import SearchBar from "../SearchBar";
import { useState } from "react";
import EquipeAPI from "../../services/equipeAPI";

export default function ManageContainer({name, equipes}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filterElements = (elements, searchQuery, active) => {
    const query = searchQuery.toLowerCase();
    return elements.filter((el) => {
      return el.name.toLowerCase().includes(query) && !el.active == !active;
    });
  };
  
  const filteredActive = filterElements(equipes, searchQuery, true);
  const filteredExcluded = filterElements(equipes, searchQuery, false);

  const [isActive, setIsActive] = useState(true);

  function toggleEquipeActive(equipe) {
    equipe.active = !equipe.active;
    setEquipes([...equipes]);
    EquipeAPI.update(equipe.id, equipe);
  }

  function deleteEquipe(element) {
    EquipeAPI.delete(element.id)
    setEquipes([...equipes.filter((e)=>e.id != element.id)]);
  }

  return (
    <div className={styles.all}>
      <fieldset className={styles.manager}>
      <legend className={styles.title}>{name}</legend>
        <div className={styles.search}>
          <div className={styles.searchBar}>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          <div className={styles.searchButton}>
            <p>Buscar</p>
          </div>
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
                  <p>{element.title}</p>
                  <div className={styles.edit}>
                    <img src="/edit.svg"/>
                    <img src="/delete.svg" onClick={() => toggleEquipeActive(element)}/>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.scroll}>
              {filteredExcluded.map((element) => (
                <div className={styles.elements} key={element.id}>
                  <p>{element.title}</p>
                  <div className={styles.edit}>
                    <img src="/edit.svg" />
                    <img src="/recover.svg" onClick={() => toggleEquipeActive(element)}/>
                    <img src="/delete.svg" onClick={() => deleteEquipe(element)}/>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </fieldset>
      <div className={styles.backButton}>
        <p>Voltar</p>
      </div>
    </div>
  );
}
