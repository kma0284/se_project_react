import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

export default function ClothesSection({
  items,
  weatherData,
  onCardClick,
  isProfileOpen,
  onAddClick,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  if (!weatherData?.type) return null;

  const filteredItems = isProfileOpen
    ? items
    : items.filter((item) => item.weather === weatherData.type);

  const temp = weatherData.temp;

  return (
    <section
      className={`clothes-section ${isProfileOpen ? "sidebar-open" : ""}`}
    >
      {isProfileOpen ? (
        <div className="clothes-section__header">
          <h2>Your items</h2>
          <button className="clothes-section__add-btn" onClick={onAddClick}>
            + Add new
          </button>
        </div>
      ) : (
        <h2 className="clothes-section__title">
          Today is {temp?.[currentTemperatureUnit]}°
          {currentTemperatureUnit.toUpperCase()} — you may want to wear:
        </h2>
      )}

      {filteredItems.length === 0 ? (
        <p className="clothes-section__empty">No items yet.</p>
      ) : (
        <ul className="cards__list">
          {filteredItems.map((item) => (
            <ItemCard
              key={item._id || item.id}
              item={item}
              onCardClick={onCardClick}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
