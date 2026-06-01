import "./ItemModal.css";
function ItemModal({ activeModal, onClose, card }) {
  if (!card) return null;
  return (
    <div
      className={`modal ${activeModal === "preview" ? "modal__opened" : ""}`}
    >
      <div className="modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          CLOSE
        </button>

        <img src={card.link} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
        </div>

        <p className="modal__weather">weather: {card.weather}</p>
      </div>
    </div>
  );
}
export default ItemModal;
