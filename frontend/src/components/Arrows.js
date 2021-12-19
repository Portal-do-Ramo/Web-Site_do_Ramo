import styles from "../styles/equipes.module.scss";

export const NextArrow = ({ onClick }) => {
    return (
      <div className={styles.next} onClick={onClick}>
        <img src="/Vector_(1).svg" />
      </div>
    );
  };

  export const PrevArrow = ({ onClick }) => {
    return (
      <div className={styles.prev} onClick={onClick}>
        <img src="/Vector_(2).svg" />
      </div>
    );
  };

export const ProjectNextArrow = ({ onClick }) => {
    return (
      <div className={styles.pnext} onClick={onClick}>
        <img src="/Arrow_EquipesRight.svg" />
      </div>
    );
  };

export const ProjectPrevArrow = ({ onClick }) => {
    return (
      <div className={styles.pprev} onClick={onClick}>
        <img src="/Arrow_EquipesLeft.svg" />
      </div>
    );
  };