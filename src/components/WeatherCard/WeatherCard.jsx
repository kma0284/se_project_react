import "./WeatherCard.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { weatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  if (!weatherData) return null;

  const { condition, isDay, temp } = weatherData;

  const weatherOption = weatherOptions.find(
    (option) => option.day === isDay && option.condition === condition,
  );

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {temp?.[currentTemperatureUnit]}°{currentTemperatureUnit}
      </p>

      <img
        className="weather-card__image"
        src={weatherOption?.url}
        alt={condition}
      />
    </section>
  );
}

export default WeatherCard;
