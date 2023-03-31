import styles from "./Modal.module.scss";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.hideCartHandler} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modalDiv}>
      <div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>
      </div>
    </div>
  );
};

const Modal = (props) => {
  const $modalOverlays = document.querySelector("#overlays");

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop hideCartHandler={props.hideCartHandler} />,
        $modalOverlays
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        $modalOverlays
      )}
    </>
  );
};

export default Modal;
