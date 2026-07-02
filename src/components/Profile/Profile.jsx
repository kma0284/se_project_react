import "./Profile.css";
import SideBar from "../SideBar/SideBar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import { Link } from "react-router-dom";

function Profile({
  username,
  setUsername,
  onClose,
  onEdit,
  clothingItems,
  weatherData,
  onCardClick,
  onAddClick,
  handleDeleteItem,
}) {
  return (
    <section className="profile-page" onClick={(e) => e.stopPropagation()}>
      <SideBar
        username={username}
        setUsername={setUsername}
        onClose={onClose}
        onEdit={onEdit}
      />
      <Link to="/" className="profile__back-btn">
        ← Back
      </Link>
      <ClothesSection
        items={clothingItems}
        weatherData={weatherData}
        onCardClick={onCardClick}
        isProfileOpen={true}
        onAddClick={onAddClick}
        onDelete={handleDeleteItem}
      />
    </section>
  );
}

export default Profile;
