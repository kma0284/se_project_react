import "./ItemCard.css";

export default function ItemCard({ item, onCardClick }) {
  return (
    
    <li className="card" onClick={() => onCardClick(item)}>
      <div className="cards">
      <img src={item.imageUrl} alt={item.name} />
      <h3 className="card__name">{item.name}</h3>
      </div>
    </li>
    
  );
}
