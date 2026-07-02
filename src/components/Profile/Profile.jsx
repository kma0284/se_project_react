import "./Profile.css";
import SideBar from "../SideBar/SideBar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";

function Profile({
  username,
  setUsername,
  onClose,
  onEdit,
  clothingItems,
  weatherData,
  onCardClick,
  onAddClick,
}) {
  return (
    <section className="profile-page" onClick={(e) => e.stopPropagation()}>
      <SideBar
        username={username}
        setUsername={setUsername}
        onClose={onClose}
        onEdit={onEdit}
      />
      <ClothesSection
        items={clothingItems}
        weatherData={weatherData}
        onCardClick={onCardClick}
        isProfileOpen={true}
        onAddClick={onAddClick}
      />
    </section>
  );
}

export default Profile;
