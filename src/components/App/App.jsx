import { useState } from "react";
import "./App.css";

import Header from "../Header/header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import { getWeatherCondition } from "../../utils/weatherApi.js";
function App() {
  const [weatherData, setWeatherData] = useState({ type: "hot" });
  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main weatherData={weatherData} />
        <Footer />
        {/* <ModalWithForm />
        <ItemModal />
        <WeatherCard />
        <ItemCard /> */}
      </div>
    </div>
  );
}

export default App;
