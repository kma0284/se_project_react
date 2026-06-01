import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";

export function WeatherCard({ weatherData }) {
  const weatherOption = weatherOptions.find((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });
  console.log("condition:", weatherData.condition);
  console.log("isDay:", weatherData.isDay);
  console.log("weatherOption:", weatherOption);
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.f}°</p>

      <img
        src={weatherOption?.url}
        alt={weatherData.condition}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
