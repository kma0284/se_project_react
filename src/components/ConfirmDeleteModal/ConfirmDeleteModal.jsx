import "./ConfirmDeleteModal.css";

export default function ConfirmDeleteModal({ item, onConfirm, onClose }) {
  if (!item) return null;

  return (
    <div className="confirm-delete">
      <h2 className="confirm-delete__title">
        <span>Are you sure you want to delete {item.name}?</span>
        <span>This action is irreversible.</span>
      </h2>

      <div className="confirm-delete__buttons">
        <button
          onClick={() => onConfirm(item)}
          className="confirm-delete__danger"
        >
          Yes, delete item
        </button>
        <button className="confirm-delete__cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
