import "./Main.css";
import { WeatherCard } from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  currentTemperatureUnit,
  handleToggleSwitchChange,
}) {
  return (
    <main className="main">
      <WeatherCard
        weatherData={weatherData}
        currentTemperatureUnit={currentTemperatureUnit}
      />

      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.f}° / You may want to wear:
        </p>

        <ul className="cards__list">
          {clothingItems
            .filter((item) => item.weather === weatherData.type)
            .map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                handleCardClick={handleCardClick}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
