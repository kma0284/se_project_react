import "./ModalWithForm.css";
import Modal from "../Modal/Modal.jsx";
export default function ModalWithForm({
  title,
  children,
  onSubmit,
  buttonText,
  isValid,
  onClose,
  isOpen,
}) {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <form className="modal-form" onSubmit={onSubmit}>
        <h2 className="modal-form__title">{title}</h2>

        {children}

        <button type="submit" disabled={!isValid}>
          {buttonText}
        </button>
      </form>
    </Modal>
  );
}
