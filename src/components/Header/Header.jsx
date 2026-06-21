import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import { Link } from "react-router-dom";

export function Header({
  handleAddClick,
  weatherData,
  username,
  currentTemperatureUnit,
  handleToggleSwitchChange,
  onAvatarClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="header logo" className="header__logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData?.city || "Loading..."}
      </p>

      <ToggleSwitch
        className="temp__toggle-btn"
        currentTemperatureUnit={currentTemperatureUnit}
        handleToggleSwitchChange={handleToggleSwitchChange}
      />

      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>

      <div className="header__user-container">
        <p className="header__username">{username}</p>

        <img
          src={avatar}
          alt="avatar image"
          className="header__avatar"
          onClick={onAvatarClick}
        />
      </div>
    </header>
  );
}

export default Header;
