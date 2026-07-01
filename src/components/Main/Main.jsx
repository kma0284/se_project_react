import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ClothesSection from "../ClothesSection/clothesSection.jsx";

export default function Main({
  weatherData,
  clothingItems,
  onCardClick,
  isProfileOpen,
  onAddClick,
}) {
  return (
    <main className="main">
      {!isProfileOpen && <WeatherCard weatherData={weatherData} />}
      <ClothesSection
        items={clothingItems}
        weatherData={weatherData}
        onCardClick={onCardClick}
        isProfileOpen={isProfileOpen}
        onAddClick={onAddClick}
      />
    </main>
  );
}
