import "./ModalWithForm.css";
export default function ModalWithForm({
  title,
  children,
  onSubmit,
  buttonText,
  isValid,
}) {
  return (
    <form className="modal__form" onSubmit={onSubmit}>
      <h2 className="modal__title">{title}</h2>

      {children}

      <button
        type="submit"
        disabled={!isValid}
        className={isValid ? "modal__submit_enabled" : "modal__submit_disabled"}
      >
        {buttonText}
      </button>
    </form>
  );
}
