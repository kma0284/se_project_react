import "./ConfirmDeleteModal.css";

export default function ConfirmDeleteModal({ item, onConfirm, onClose }) {
  if (!item) return null;

  return (
    <div className="confirm-delete">
      <h2>Are you sure?</h2>

      <p>
        This will permanently delete <strong>{item.name}</strong>
      </p>

      <div className="confirm-delete__buttons">
        <button onClick={onClose}>Cancel</button>

        <button
          onClick={() => onConfirm(item)}
          className="confirm-delete__danger"
        >
          Yes, delete
        </button>
      </div>
    </div>
  );
}
