import "./ItemCard.css";

export default function ItemCard({ item, onCardClick }) {
  return (
    <li className="card" onClick={() => onCardClick(item)}>
      <img src={item.link} alt={item.name} />
      <h3>{item.name}</h3>
    </li>
  );
}
