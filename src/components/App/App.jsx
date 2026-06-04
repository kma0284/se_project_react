import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm.js";
import "./App.css";
import { APIkey } from "../../utils/constants.js";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { ItemCard } from "../ItemCard/ItemCard.jsx";
import { filterWeatherData, getWeather } from "../../utils/weatherApi.js";
import { getCurrentCoordinates } from "../../utils/weatherApi.js";
import { defaultClothingItems } from "../../utils/constants.js";

function App() {
  const { values, errors, isValid, handleChange, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { f: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    resetForm();
  };
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "Name";
  });

  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);
  const [clothingItems, setClothingItems] = useState([]);

  useEffect(() => {
    setClothingItems(defaultClothingItems);
  }, []);
  const [selectedCard, setSelectedCard] = useState({});
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const DEFAULT_COORDS = {
    latitude: 28.5383,
    longitude: -81.3792,
  };

  useEffect(() => {
    getCurrentCoordinates()
      .catch(() => {
        return DEFAULT_COORDS;
      })
      .then((coords) => getWeather(coords, APIkey))
      .then((res) => {
        const filteredData = filterWeatherData(res);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);
  return (
    <div className="page">
      <div className="page__content">
        <Header
          handleAddClick={handleAddClick}
          weatherData={weatherData}
          username={username}
          setUsername={setUsername}
        />
        <Main
          weatherData={weatherData}
          handleCardClick={handleCardClick}
          setActiveModal={setActiveModal}
          clothingItems={clothingItems}
        />
        <Footer />
      </div>
      <ModalWithForm
        name="add-garment"
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
        values={values}
        errors={errors}
        isValid={isValid}
        handleChange={handleChange}
      >
        <label htmlFor="Name" className="modal__label" id="name__label">
          Name{" "}
          <input
            type="text"
            name="name"
            className="modal__input"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            id="name__label"
            required
          />
        </label>
        <label htmlFor="ImageURl" className="modal__label" id="url__label">
          Image{" "}
          <input
            type="text"
            name="imageUrl"
            className="modal__input"
            placeholder="Image URL"
            value={values.imageUrl}
            onChange={handleChange}
            id="url__label"
            required
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label
            htmlFor="hot"
            id="hot"
            className={`modal__label modal__label_type_radio ${
              values.weather === "hot" ? "modal__label_active" : ""
            }`}
          >
            <input
              id="hot"
              type="radio"
              name="weather"
              value="hot"
              onChange={handleChange}
              className="modal__radio-input"
            />
            Hot
          </label>
          <label
            htmlFor="warm"
            id="warm"
            className={`modal__label modal__label_type_radio ${
              values.weather === "warm" ? "modal__label_active" : ""
            }`}
          >
            <input
              id="warm"
              type="radio"
              name="weather"
              value="warm"
              onChange={handleChange}
              className="modal__radio-input"
            />
            Warm
          </label>
          <label
            htmlFor="cold"
            id="cold"
            className={`modal__label modal__label_type_radio ${
              values.weather === "cold" ? "modal__label_active" : ""
            }`}
          >
            <input
              id="cold"
              type="radio"
              name="weather"
              value="cold"
              onChange={handleChange}
              className="modal__radio-input"
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>

      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
