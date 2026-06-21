import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useForm } from "../../hooks/useForm.js";

import "./App.css";

import { APIkey, defaultClothingItems } from "../../utils/constants.js";
import {
  getWeather,
  filterWeatherData,
  getCurrentCoordinates,
} from "../../utils/weatherApi.js";

import Modal from "../Modal/Modal.jsx";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import Profile from "../Profile/Profile.jsx";
import ProfileModal from "../ProfileModal/ProfileModal.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

import ClothesSection from "../ClothesSection/clothesSection.jsx";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import SideBar from "../SideBar/SideBar.jsx";

function App() {
  const MODAL = {
    // PROFILE: "profile",
    EDIT_PROFILE: "edit-profile",
    PREVIEW: "preview",
    ADD: "add",
    DELETE: "delete",
  };

  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // const openProfile = () => setIsProfileOpen(true);
  const closeProfile = () => setIsProfileOpen(false);
  const openProfile = () => {
    setActiveModal(null);
    setIsProfileOpen(true);
  };
  const { resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  // ---------------- STATE ----------------
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const [clothingItems, setClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { f: 999 },
    city: "",
  });

  const [user] = useState({ name: "Guest", location: "" });

  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "Name";
  });

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("f");

  // ---------------- EFFECTS ----------------
  useEffect(() => {
    console.log("selectedCard:", selectedCard);
  }, [selectedCard]);

  useEffect(() => {
    console.log("activeModal changed:", activeModal);
  }, [activeModal]);
  useEffect(() => {
    setClothingItems(defaultClothingItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);

  useEffect(() => {
    const DEFAULT_COORDS = {
      latitude: 28.5383,
      longitude: -81.3792,
    };

    getCurrentCoordinates()
      .catch(() => DEFAULT_COORDS)
      .then((coords) => getWeather(coords, APIkey))
      .then((res) => setWeatherData(filterWeatherData(res)))
      .catch(console.error);
  }, []);

  // ---------------- MODAL CONTROLS ----------------
  const openModal = (type) => {
    setIsProfileOpen(false);
    setActiveModal(type);
  };
  const closeModal = () => {
    setActiveModal(null);
    // setSelectedCard(null);
    resetForm();
  };

  // ----------------  HANDLING ----------------
  const handleCardClick = (card) => {
    setIsProfileOpen(false);
    setSelectedCard(card);
    setActiveModal(MODAL.PREVIEW);
  };
  const handleAvatarClick = () => {
    setSelectedCard(null);
    setActiveModal(MODAL.PROFILE);
  };

  // ---------------- ADD ITEM ----------------
  const handleAddItem = (item) => {
    setClothingItems((prev) => [
      { ...item, _id: crypto.randomUUID() },
      ...prev,
    ]);
    closeModal();
  };

  // ---------------- DELETE ITEM ----------------
  const handleDeleteItem = (item) => {
    setClothingItems((prev) => prev.filter((i) => i._id !== item._id));
    setSelectedCard(null);
    closeModal();
  };

  // ---------------- TEMP TOGGLE ----------------
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "f" ? "c" : "f"));
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{
        currentTemperatureUnit,
        handleToggleSwitchChange,
      }}
    >
      <Header
        user={user}
        weatherData={weatherData}
        username={username}
        setUsername={setUsername}
        currentTemperatureUnit={currentTemperatureUnit}
        handleToggleSwitchChange={handleToggleSwitchChange}
        handleAddClick={() => openModal(MODAL.ADD)}
        onAvatarClick={() => setIsProfileOpen(true)}
      />
      <div className={`app-layout ${isProfileOpen ? "sidebar-open" : ""}`}>
        <div className="main-content">
          {/* PROFILE */}

          <SideBar
            username={username}
            setUsername={setUsername}
            onClose={closeProfile}
            onEdit={() => setActiveModal(MODAL.EDIT_PROFILE)}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  currentTemperatureUnit={currentTemperatureUnit}
                  items={clothingItems}
                />
              }
            />
          </Routes>
        </div>
        {/*  SINGLE MODAL SYSTEM */}
        <Modal
          isOpen={activeModal !== null && activeModal !== MODAL.PROFILE}
          onClose={closeModal}
        >
          {" "}
          {activeModal === MODAL.PREVIEW ? (
            selectedCard ? (
              <div>
                <img src={selectedCard.link} alt={selectedCard.name} />
                <h2>{selectedCard.name}</h2>
                <p className="modal__weather">
                  Weather: {selectedCard.weather}
                </p>
                <button onClick={() => setActiveModal(MODAL.DELETE)}>
                  Delete
                </button>
              </div>
            ) : (
              <p>Loading item...</p>
            )
          ) : null}
          {activeModal === MODAL.ADD && (
            <AddItemModal onAddItem={handleAddItem} onClose={closeModal} />
          )}
          {activeModal === MODAL.DELETE && (
            <ConfirmDeleteModal
              item={selectedCard}
              onConfirm={handleDeleteItem}
              onClose={closeModal}
            />
          )}
          {activeModal === MODAL.EDIT_PROFILE && (
            <ProfileModal
              activeModal={activeModal}
              onClose={closeModal}
              onSubmit={(e) => {
                e.preventDefault();
                closeModal();
              }}
              isValid={true}
            >
              <label className="modal__label">
                Name
                <input
                  className="modal__input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
            </ProfileModal>
          )}
        </Modal>
      </div>
      <Footer />
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
