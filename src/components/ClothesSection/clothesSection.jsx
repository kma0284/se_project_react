import { ItemCard } from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, handleCardClick, handleAddClick }) {
  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <p>Your items</p>

        <button
          type="button"
          onClick={handleAddClick}
          className="clothes-section__add-btn"
        >
          + Add New
        </button>
      </div>

      <ul className="cards__list">
        {clothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            handleCardClick={handleCardClick}
          />
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
