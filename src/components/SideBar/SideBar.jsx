import "./SideBar.css";

function SideBar({ username, onEdit }) {
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img
          className="sidebar__avatar"
          src="https://practicum-content.s3.us-west-1.amazonaws.com/frontend-developer/common/avatar.jpg"
          alt="avatar"
        />

        <p className="sidebar__username">{username}</p>
      </div>

      <div className="sideBar__actions">
        <button onClick={onEdit} className="edit__userName">
          Edit Name
        </button>
      </div>
    </div>
  );
}
export default SideBar;
