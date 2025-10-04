import { useState, useEffect } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { coordinates } from "../../utils/constants";
import { apiKey } from "../../utils/constants";
import getWeather from "../../utils/weatherApi";
import { filterWeatherData } from "../../utils/weatherApi";
import { defaultClothingItems } from "../../utils/constants";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const handleAddClick = () => setActiveModal("add-garment");
  const [selectedCard, setSelectedCard] = useState({});
  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    const handleOverlayClick = (e) => {
      if (e.target.classList.contains("modal")) {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("click", handleOverlayClick);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("click", handleOverlayClick);
    };
  }, [activeModal]);

  const [formFilled, setFormFilled] = useState(false);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);

        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main
          weatherData={weatherData}
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
        />
        <Footer />
        <ModalWithForm
          buttonText="Add Garment"
          title="New Garment"
          activeModal={activeModal}
          closeActiveModal={closeActiveModal}
          formFilled={formFilled}
        >
          <label htmlFor="item-name-input" className="modal__label">
            Name
          </label>
          <input
            className="modal__input"
            type="text"
            id="item-name-input"
            placeholder="Name"
            minLength="2"
            maxLength="40"
            required
            onChange={(event) => {
              console.log(event.target.value);
            }}
          />
          <span id="item-name-input-error" className="modal__error"></span>
          <label htmlFor="image-link-input" className="modal__label">
            Image
          </label>
          <input
            className="modal__input"
            type="url"
            id="image-link-input"
            placeholder="Image URL"
            required
            onChange={() => {}}
          />
          <span id="image-link-input-error" className="modal__error"></span>
          <fieldset className="modal__radio-btns">
            <legend className="modal__legend">Select the weather type:</legend>
            <label
              htmlFor="Hot"
              className="modal__label modal__label_type_radio"
            >
              <input
                className="modal__radio-input"
                type="radio"
                id="Hot"
                name="weather"
                required
                value="hot"
                onChange={() => {}}
              />{" "}
              <span>Hot</span>
            </label>
            <label
              htmlFor="Warm"
              className="modal__label modal__label_type_radio"
            >
              <input
                className="modal__radio-input"
                type="radio"
                id="Warm"
                name="weather"
                required
                value="warm"
                onChange={() => {}}
              />{" "}
              <span>Warm</span>
            </label>
            <label
              htmlFor="Cold"
              className="modal__label modal__label_type_radio"
            >
              <input
                className="modal__radio-input"
                type="radio"
                id="Cold"
                name="weather"
                required
                value="cold"
                onChange={() => {}}
              />{" "}
              <span>Cold</span>
            </label>
          </fieldset>
        </ModalWithForm>
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          closeActiveModal={closeActiveModal}
        />
      </div>
    </div>
  );
}

export default App;
