import Modal from 'react-modal';
import styles from './DeleteAlertModal.module.scss';

//Componente de alerta para confirmação de exclusão de algum item
export const DeleteAlertModal = ({
  modalIsOpen,
  handleCloseModal,
  title,
  text,
  clickFunction
}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleCloseModal}
      className={styles.modal}
      overlayClassName={styles.overlay}
      contentLabel='Example Modal'
      shouldCloseOnEsc={true}
      style={{ overlay: { zIndex: 10 } }}
    >
      <img src='/cancel.svg'></img>
      <h1>{title}</h1>
      <p>{text}</p>
      <div className={styles.rowButton}>
        <button
          type='button'
          className={styles.cancel}
          onClick={handleCloseModal}
        >
          Cancelar
        </button>
        <button
          type='button'
          className={styles.shutDown}
          onClick={clickFunction}
        >
          Sim, excluir
        </button>
      </div>
    </Modal>
  );
};
