import "./WeatherCard.css";
// import { weatherOptions } from "../../utils/constants.js";
function WeatherCard({ weatherData }) {
  // const weatherOption = weatherOption.filter((option) => {
  //   return option.day === weatherData.isDay;
  // });
  return (
    <section className="weather__card">
      <p className="weather-card__temp"> {weatherData.temp.F} &deg;</p>
      <img
        src={weatherCards}
        alt="weather banner"
        className="weather-card__image"
      />
    </section>
  );
}
export default WeatherCard;
