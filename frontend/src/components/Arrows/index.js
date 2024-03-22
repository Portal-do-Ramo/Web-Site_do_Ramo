import styles from './Arrow.module.scss';

export const NextArrow = ({ onClick }) => {
  return (
    <div className={styles.next} onClick={onClick}>
      <img src='/nextArrow.svg' />
    </div>
  );
};

export const PrevArrow = ({ onClick }) => {
  return (
    <div className={styles.prev} onClick={onClick}>
      <img src='/prevArrow.svg' />
    </div>
  );
};

export const ProjectNextArrow = ({ onClick, disabled }) => {
  return (
    <div
      className={disabled ? styles.pNextDisabled : styles.pNext}
      onClick={onClick}
    >
      <img src='/Arrow_EquipesRight.svg' />
    </div>
  );
};

export const ProjectPrevArrow = ({ onClick, disabled }) => {
  return (
    <div
      className={disabled ? styles.pPrevDisabled : styles.pPrev}
      onClick={onClick}
    >
      <img src='/Arrow_EquipesLeft.svg' />
    </div>
  );
};

export const AwardNextArrow = ({ onClick, disabled }) => {
  return (
    <div
      className={disabled ? styles.awardNextDisabled : styles.awardNext}
      onClick={onClick}
    >
      <img src={disabled ? '/nextArrow-disabled.svg' : '/nextArrow.svg'} />
    </div>
  );
};

export const AwardPrevArrow = ({ onClick, disabled }) => {
  return (
    <div
      className={disabled ? styles.awardPrevDisabled : styles.awardPrev}
      onClick={onClick}
    >
      <img src={disabled ? '/prevArrow-disabled.svg' : '/prevArrow.svg'} />
    </div>
  );
};
