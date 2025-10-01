import "./Header.css";
import Logo from "../../assets/Logo.png";
import Avatar from "../../assets/Avatar.png";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img src={Logo} alt="wtwr logo" className="header__logo" />
      <p className="header__date">
        {currentDate}, {weatherData.city}
      </p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Tajgi Fields</p>
        <img src={Avatar} alt="Avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
