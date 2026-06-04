import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
export function Header({ handleAddClick, weatherData, username, setUsername }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const handleEditName = () => {
    const newName = prompt("Enter your name:", username);

    if (newName?.trim()) {
      setUsername(newName.trim());
    }
  };
  return (
    <header className="header">
      <img src={logo} alt="logo" className="header__logo" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username" onClick={handleEditName}>
          {username}
        </p>

        <img src={avatar} alt="avatar image" className="header__avatar" />
      </div>
    </header>
  );
}
export default Header;
