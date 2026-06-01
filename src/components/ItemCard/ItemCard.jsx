import "./ItemCard.css";
import { defaultClothingItems } from "../../utils/constants";
export function ItemCard({ item, handleCardClick }) {
  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>

      <img
        onClick={() => handleCardClick(item)}
        className="card__image"
        src={item.link}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
