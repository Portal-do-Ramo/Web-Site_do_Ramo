import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { AiOutlinePicture } from 'react-icons/ai';
import styles from "./Modal.module.scss";


export function ProjectDetail({ project }) {
    return (
      <div className={styles.main}>
        
        <div className={styles.imageholder}>
          {
            project.image === null ? 
            (<AiOutlinePicture/>) : <img src={project.image}></img>
          }
        </div>
        <div className={styles.projectdescription}>
          <p>
            {project.description}
          </p>
          <h4>Status: Em Andamento</h4>
          <h4>Membros</h4>
          <div className={styles.members}>
            {
              project.members.map(member => {
                return (
                  <div className={styles.memberholder}>{member.name}</div>
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
