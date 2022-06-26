import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { AiOutlinePicture } from 'react-icons/ai';
import styles from "./Modal.module.scss";


export function ProjectDetail({ project }) {
    return (
      <div className={styles.main}>
        <div className={styles.imageHolder}>
          {
            project.image === null ? 
            (<AiOutlinePicture/>) : <img src={project.image}></img>
          }
        </div>
        <div className={styles.projectDescription}>
          <strong> {project.name} </strong>
          <p>
            {project.description}
          </p>
          <span>Status: <strong>Em Andamento</strong></span>
          <span>Membros</span>
          <div className={styles.members}>
            {
              project.members.map((member, idx) => {
                return (
                  <div className={styles.memberHolder} key={idx}>{member.name}</div>
                )
              })
            }
          </div>
        </div>
      </div>
    );
}











/*
const ProjectModal = ({ show, onClose, children }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };
  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.body}>
        <a onClick={handleCloseClick}><img src="/close.svg"/> </a>
        {children}
      </div>
    </div>
  ) : null;
  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal")
    );
  } else {
    return null;
  }
};
export default ProjectModal;
*/
