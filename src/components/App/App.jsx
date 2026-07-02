import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

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
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import Profile from "../Profile/Profile.jsx";
import ProfileModal from "../ProfileModal/ProfileModal.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const MODAL = {
  EDIT_PROFILE: "edit_profile",
  PREVIEW: "preview",
  ADD: "add",
  DELETE: "delete",
};

function App() {
  // ---------------- STATE ----------------
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const [clothingItems, setClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { f: 999 },
    city: "",
  });

  const [username, setUsername] = useState(
    () => localStorage.getItem("username") || "Name",
  );

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("f");

  // ---------------- EFFECTS ----------------
  useEffect(() => {
    setClothingItems(defaultClothingItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);

  useEffect(() => {
    const DEFAULT_COORDS = { latitude: 28.5383, longitude: -81.3792 };

    getCurrentCoordinates()
      .catch(() => DEFAULT_COORDS)
      .then((coords) => getWeather(coords, APIkey))
      .then((res) => setWeatherData(filterWeatherData(res)))
      .catch(console.error);
  }, []);

  // ---------------- MODAL CONTROLS ----------------
  const openModal = (type) => {
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
  };
  const handleEditProfile = () => {
    setActiveModal((current) =>
      current === MODAL.EDIT_PROFILE ? null : MODAL.EDIT_PROFILE,
    );
  };
  // ---------------- HANDLERS ----------------
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal(MODAL.PREVIEW);
  };

  const handleAddItem = (item) => {
    setClothingItems((prev) => [
      { ...item, _id: crypto.randomUUID() },
      ...prev,
    ]);
    closeModal();
  };

  const handleDeleteItem = (item) => {
    setClothingItems((prev) => prev.filter((i) => i._id !== item._id));
    setSelectedCard(null);
    closeModal();
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "f" ? "c" : "f"));
  };

  // ---------------- RENDER ----------------
  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <Header
        weatherData={weatherData}
        username={username}
        setUsername={setUsername}
        handleAddClick={() => openModal(MODAL.ADD)}
        onAvatarClick={() => navigate("/profile")}
      />

      <div className="app-layout">
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  onAddClick={() => openModal(MODAL.ADD)}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  {activeModal === null && (
                    <Profile
                      username={username}
                      setUsername={setUsername}
                      onClose={() => navigate("/")}
                      onEdit={handleEditProfile}
                    />
                  )}
                  <ClothesSection
                    items={clothingItems}
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    isProfileOpen={activeModal === null}
                    onAddClick={() => openModal(MODAL.ADD)}
                  />
                </>
              }
            />
          </Routes>
        </div>
        {/* SINGLE MODAL SYSTEM */}
        <Modal
          isOpen={activeModal !== null}
          onClose={closeModal}
          className={
            activeModal === MODAL.DELETE ? "modal__content_type_confirm" : ""
          }
        >
          {" "}
          {activeModal === MODAL.PREVIEW && selectedCard && (
            <ItemModal
              item={selectedCard}
              onDeleteClick={() => setActiveModal(MODAL.DELETE)}
            />
          )}
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
