import "./ModalWithForm.css";
import closeIcon from "../../assets/closeIconDark.svg";
function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  onClose,
  isValid,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid) return;

    onClose();
  };

  const isOpen = activeModal === name;
  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal__opened" : ""}`}
      onClick={onClose}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{title}</h2>

        <button
          onClick={onClose}
          type="button"
          className="modal__close"
          aria-label="Close modal"
        >
          <img src={closeIcon} alt="" className="modal__close-icon" />
        </button>
        <form className="modal__form" onSubmit={handleSubmit}>
          {children}

          <button
            type="submit"
            className={`modal__submit ${
              isValid ? "modal__submit_enabled" : ""
            }`}
            disabled={!isValid}
          >
            Add garment
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
