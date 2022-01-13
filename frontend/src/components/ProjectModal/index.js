import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";

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
