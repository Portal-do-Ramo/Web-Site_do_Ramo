import styles from "./styles.module.scss";

export function ProjectCard({ project, onCLick }) {
  return (
    <div onClick={onCLick}>
      <div className={styles.card}>
        <img src={project.image}/>
        <div className={styles.projectinfo}>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
        </div>
      </div>
    </div>
  );
}