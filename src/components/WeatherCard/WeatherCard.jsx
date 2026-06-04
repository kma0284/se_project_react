import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";

export function WeatherCard({ weatherData }) {
  const weatherOption = weatherOptions.find((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  const fallbackUrl = "/default-weather.png";

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.f}°F</p>

      <img
        src={weatherOption?.url || fallbackUrl}
        alt={weatherData.condition}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
