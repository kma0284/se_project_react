function SideBar({ username }) {
  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src="https://practicum-content.s3.us-west-1.amazonaws.com/frontend-developer/common/avatar.jpg"
        alt="avatar"
      />
      <p className="sidebar__username">{username}</p>
    </div>
  );
}

export default SideBar;
