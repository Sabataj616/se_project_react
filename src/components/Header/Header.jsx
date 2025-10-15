import "./Header.css";
import Logo from "../../assets/Logo.png";
import Avatar from "../../assets/Avatar.png";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData, ToggleSwitch }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <Link to="/">
        <img src={Logo} alt="wtwr logo" className="header__logo" />
      </Link>
      <p className="header__date">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      <Link className="header__link" to="/profile">
        <div className="header__user-container">
          <p className="header__username">Tajgi Fields</p>
          <img src={Avatar} alt="Avatar" className="header__avatar" />
        </div>
      </Link>
    </header>
  );
}

export default Header;
