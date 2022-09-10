import styles from "./styles.module.scss";

export function ProjectCard({ project, onCLick, active }) {
  return (
    <div onClick={onCLick}>
      <div className={styles.card} id={active ? styles.cardActive : ""}>
        <img src={project.logoURL}/>
        <div className={styles.projectInfo}>
          <span>{project.name}</span>
          <p>{project.description}</p>
        </div>
      </div>
    </div>
  );
}