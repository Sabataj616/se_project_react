import "./Header.css";
import Logo from "../../assets/Logo.png";


import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/currentUserContext";

function Header({
  handleAddClick,
  weatherData,
  ToggleSwitch,
  handleLogInClick,
  handleRegisterClick,
  handleEditProfileClick,
  handleSignOut,
  isLoggedIn,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const currentUser = useContext(CurrentUserContext);
  return (
    <header className="header">
      <Link to="/">
        <img src={Logo} alt="wtwr logo" className="header__logo" />
      </Link>
      <p className="header__date">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />
      {isLoggedIn && (
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
      )}
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
      {!isLoggedIn && (
        <button
          onClick={handleRegisterClick}
          type="button"
          className="header__add-clothes-btn"
        >
          Sign Up
        </button>
      )}
      {!isLoggedIn && (
        <button
          onClick={handleLogInClick}
          type="button"
          className="header__add-clothes-btn"
        >
          Log In
        </button>
      )}
      {isLoggedIn && currentUser && (
        <Link className="header__link" to="/Profile">
          <div className="header__user-container">
            <p className="header__username">{currentUser.name}</p>
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt="Avatar"
                className="header__avatar"
              />
            ) : (
              <div className="avatar-placeholder">
                {currentUser?.name?.slice(0, 1) || '👤'}
              </div>
            )}
          </div>
        </Link>
      )}
    </header>
  );
}

export default Header;
