import "./WeatherCard.css";
import SunnyDay from "../../assets/sunnyDay.png";

import { weatherCards } from "../../utils/constants";
function WeatherCard({}) {
  return (
    <section className="weather__card">
      <p className="weather-card__temp"> </p>
      <img
        src={weatherCards}
        alt="weather banner"
        className="weather-card__image"
      />
    </section>
  );
}
export default WeatherCard;
