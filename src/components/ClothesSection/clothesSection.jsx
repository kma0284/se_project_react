import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

export default function ClothesSection({ items, weatherData, onCardClick }) {
  if (!weatherData?.type) return null;

  const filteredItems = items.filter(
    (item) => item.weather === weatherData.type,
  );

  return (
    <section className="clothes-section">
      <h2>Recommended for you</h2>

      {filteredItems.length === 0 ? (
        <p>No items for this weather yet.</p>
      ) : (
        <ul className="cards__list">
          {filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))}
        </ul>
      )}
    </section>
  );
}
