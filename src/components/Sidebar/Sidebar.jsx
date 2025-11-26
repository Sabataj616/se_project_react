import "./Sidebar.css";

import { useContext } from "react";
import CurrentUserContext from "../../contexts/currentUserContext";

function Sidebar({ isLoggedIn, handleEditProfileClick, handleSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <img
          src={currentUser.avatar}
          alt="Avatar"
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      {isLoggedIn && (
        <button
          onClick={handleEditProfileClick}
          type="button"
          className="header__add-clothes-btn"
        >
          Edit Profile
        </button>
      )}
      {isLoggedIn && (
        <button
          onClick={handleSignOut}
          type="button"
          className="header__add-clothes-btn"
        >
          Sign Out
        </button>
      )}
    </aside>
  );
}

export default Sidebar;
