import "./ItemModal.css";
import closeIcon from "../../assets/closeIcon.svg";

export default function ItemModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="item-modal">
      <img src={item.link} alt={item.name} className="item-modal__image" />

      <h2>{item.name}</h2>
    </div>
  );
}
