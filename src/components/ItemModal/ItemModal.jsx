import "./ItemModal.css";
import closeIcon from "../../assets/closeIcon.svg";
function ItemModal({ activeModal, onClose, card, handleDelete }) {
  if (!card) return null;
  return (
    <div
      className={`modal ${activeModal === "preview" ? "modal__opened" : ""}`}
    >
      <div className="modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
          aria-label="Close modal"
        >
          <img src={closeIcon} alt="close icon" className="modal__close-icon" />
        </button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>

          <p className="modal__weather">Weather: {card.weather}</p>
        </div>{" "}
        <button className="modal__delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
export default ItemModal;
