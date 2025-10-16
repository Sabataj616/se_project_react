import "./Sidebar.css";
import Avatar from "../../assets/Avatar.png";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <img src={Avatar} alt="Avatar" className="sidebar__avatar" />
        <p className="sidebar__username">Tajgi Fields</p>
      </div>
    </aside>
  );
}

export default Sidebar;
