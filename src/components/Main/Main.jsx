import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ClothesSection from "../ClothesSection/clothesSection.jsx";

export default function Main({
  weatherData,
  clothingItems,
  onCardClick,
  currentTemperatureUnit,
}) {
  return (
    <main className="main">
      <WeatherCard
        weatherData={weatherData}
        currentTemperatureUnit={currentTemperatureUnit}
      />

      <ClothesSection
        items={clothingItems}
        weatherData={weatherData}
        onCardClick={onCardClick}
      />
    </main>
  );
}
