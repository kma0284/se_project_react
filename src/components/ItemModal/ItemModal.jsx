import "./ItemModal.css";

export default function ItemModal({ item, onDeleteClick }) {
  if (!item) return null;

  return (
    <div className="modal__preview">
      <img
        className="modal__preview-image"
        src={item.imageUrl}
        alt={item.name}
      />

      <div className="modal__preview-footer">
        <p className="modal__preview-name">{item.name}</p>

        <button className="modal__delete-btn" onClick={onDeleteClick}>
          Delete item
        </button>
      </div>

      <p className="modal__weather">Weather: {item.weather}</p>
    </div>
  );
}
