import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import { defaultClothingItems } from "../../utils/constants.js";
import ItemCard from "../ItemCard/ItemCard.jsx";
function Main({ weatherData }) {
  return (
    <main className="main">
      <WeatherCard />
      <section className="cards">
        <p className="cards__text">the weather today is</p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return <ItemCard key={item.id} item={item} />;
            })}
        </ul>
      </section>
    </main>
  );
}
export default Main;
