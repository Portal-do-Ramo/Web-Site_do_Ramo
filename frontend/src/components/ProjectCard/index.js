import styles from "./styles.module.scss";

export function ProjectCard({ project, onCLick, id }) {
  return (
    <div onClick={onCLick}>
      <div className={styles.card} id={id}>
        <img src={project.image}/>
        <div className={styles.projectinfo}>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
        </div>
      </div>
    </div>
  );
}