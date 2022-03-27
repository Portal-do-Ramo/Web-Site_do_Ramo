import styles from "./styles.module.scss";

export function ProjectCard({ project, onCLick, id }) {
  return (
    <div onClick={onCLick}>
      <div className={styles.card} id={id}>
        <img src={project.image}/>
        <div className={styles.projectinfo}>
          <span>{project.name}</span>
          <p>{project.description}</p>
        </div>
      </div>
    </div>
  );
}