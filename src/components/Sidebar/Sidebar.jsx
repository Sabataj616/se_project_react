import "./Sidebar.css";

import { useContext } from "react";
import CurrentUserContext from "../../contexts/currentUserContext";

function Sidebar({ isLoggedIn, handleEditProfileClick, handleSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      {isLoggedIn && currentUser && (
        <div className="sidebar__user-container">
          {currentUser.data?.avatar ? (
            <img
              src={currentUser.data.avatar}
              alt="Avatar"
              className="sidebar__avatar"
            />
          ) : (
            <div className="avatar-placeholder">
              {currentUser?.name?.slice(0, 1) || "👤"}
            </div>
          )}

          <p className="sidebar__username">{currentUser.data.name}</p>
        </div>
      )}
      {isLoggedIn && (
        <div className="sidebar__edit-container">
        <button
          onClick={handleEditProfileClick}
          type="button"
          className="sidebar__change-profile-btn"
        >
          Change profile data
        </button>
        </div>
      )}
      {isLoggedIn && (
        <button
          onClick={handleSignOut}
          type="button"
          className="sidebar__change-profile-btn"
        >
          Log Out
        </button>
      )}
    </aside>
  );
}

export default Sidebar;
