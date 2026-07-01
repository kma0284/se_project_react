import "./Profile.module.css";
import SideBar from "../SideBar/SideBar.jsx";
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
