import SideBar from "../SidBar/SideBar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile(props) {
  return (
    <div className="profile">
      <SideBar username={props.username} />

      <ClothesSection
        clothingItems={props.clothingItems}
        handleCardClick={props.handleCardClick}
        handleAddClick={props.handleAddClick}
      />
    </div>
  );
}

export default Profile;
