import SideBar from "../SideBar/SideBar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";
function Profile({ username, setUsername, onClose, onEdit }) {
  return (
    <section className="profile" onClick={(e) => e.stopPropagation()}>
      <SideBar
        username={username}
        setUsername={setUsername}
        onClose={onClose}
        onEdit={onEdit}
      />
    </section>
  );
}

export default Profile;
