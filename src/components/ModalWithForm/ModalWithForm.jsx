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

    console.log("Valid garment:", values);

    resetForm();
    onClose();
  };
  return (
    <div
      className={`modal ${
        activeModal === "add-garment" ? "modal__opened" : ""
      }`}
      onClick={onClose}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{title}</h2>

        <button onClick={onClose} type="button" className="modal__close">
          <img
            src={closeIcon}
            alt=""
            className="modal__close-icon"
            aria-label="Close modal"
          />
        </button>

        <form className="modal__form" onSubmit={handleSubmit}>
          {children}

          <button type="submit" className="modal__submit" disabled={!isValid}>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
