import React from 'react';
import styles from './styles.module.scss';

export function ProjectDetail({ project }) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  return (
    <div className={styles.main}>
      <div className={styles.imageHolder}>
        <img src={project.imageURL} />
      </div>

      <div className={styles.projectDescription}>
        <strong> {project.name} </strong>
        {project.description.split(/\r?\n/g).map((info) => {
          if (info !== '') {
            return info.split(urlRegex).map((description) => {
              if (description.match(urlRegex)) {
                return <a href={description}>{description}</a>;
              } else if (description !== '') {
                return <p>{description}</p>;
              }
            });
          }
        })}

        {project.ended ? (
          <span>
            Status: <strong>Finalizado</strong>
          </span>
        ) : (
          <span>
            Status: <strong>Em Andamento</strong>
          </span>
        )}
        <span>Membros</span>

        <div className={styles.members}>
        {project.members ? (
            project.members.split(',').map((member, idx) => (
              <div className={styles.memberHolder} key={idx}>
                {member}
              </div>
            ))
          ) : (
            <div className={styles.memberHolder}>Sem membros especificados</div>
          )}
        </div>
      </div>
    </div>
  );
}
