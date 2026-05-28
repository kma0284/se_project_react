import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";

function Main() {
  return (
    <main className="main">
      <WeatherCard />
      <section className="cards">
        <p className="cards__text">the weather today is</p>
        {/* add cards */}
      </section>
    </main>
  );
}
export default Main;
