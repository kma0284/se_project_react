import "./Header.css";

function Header() {
  return (
    <header className="header">
      <img src="" alt="" className="header__image" />
      <p className="header__date-and-location">date location</p>
      <button className="header__add-clithes-btn">+ Add clothes</button>
      <div className="header__user-container">
        <p className="header__username">name</p>
        <img src="" alt="" className="header__avatar" />
      </div>
    </header>
  );
}
export default Header;
