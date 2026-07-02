import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import { APIkey } from "../../utils/constants";
import {
  getCurrentCoordinates,
  getWeather,
  filterWeatherData,
} from "../../utils/weatherApi";

import { getItems, addItem, deleteItem } from "../../utils/api";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";

import Modal from "../Modal/Modal";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import ProfileModal from "../ProfileModal/ProfileModal";

import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const MODAL = {
  EDIT_PROFILE: "edit_profile",
  PREVIEW: "preview",
  ADD: "add",
  DELETE: "delete",
};

function App() {
  // ---------------- STATE ----------------
  // const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [items, setItems] = useState([]);
  const [weatherData, setWeatherData] = useState({
    city: "",
    type: "",
    temp: {
      f: 0,
      c: 0,
    },
  });

  const [username, setUsername] = useState(
    () => localStorage.getItem("username") || "Name",
  );

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("f");

  // ---------------- EFFECTS ----------------
  //load clothing items from API on mount
  useEffect(() => {
    getItems()
      .then((data) => setItems(data))
      .catch(console.error);
  }, []);
  //save username to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);

  useEffect(() => {
    getCurrentCoordinates()
      .then((coords) => getWeather(coords, APIkey))
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);
  }, []);

  // ---------------- MODAL CONTROLS ----------------
  const openModal = (modal) => {
    setActiveModal(modal);
  };

  const closeModal = () => {
    setActiveModal(null);
  };
  // ---------------- HANDLERS ----------------
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal(MODAL.PREVIEW);
  };

  function handleAddItem(values) {
    addItem(values)
      .then((newItem) => {
        setItems((prev) => [newItem, ...prev]);
      })
      .catch(console.error);
  }

  function handleDeleteItem(item) {
    console.log("Deleting item:", item);
    console.log("Deleting _id:", item._id);

    deleteItem(item._id)
      .then(() => {
        console.log("Delete successful");

        setItems((prev) => prev.filter((i) => i._id !== item._id));
        closeModal();
      })
      .catch(console.error);
  }

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((unit) => (unit === "f" ? "c" : "f"));
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
      />

      <div className="app-layout">
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={items}
                  onCardClick={handleCardClick}
                  onAddClick={() => openModal(MODAL.ADD)}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  username={username}
                  setUsername={setUsername}
                  clothingItems={items}
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  onAddClick={() => openModal(MODAL.ADD)}
                  onEdit={() => openModal(MODAL.EDIT_PROFILE)}
                />
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
