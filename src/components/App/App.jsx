import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { coordinates } from "../../utils/constants";
import { apiKey } from "../../utils/constants";
import getWeather from "../../utils/weatherApi";
import { filterWeatherData } from "../../utils/weatherApi";

import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";
import Profile from "../Profile/Profile";
import { deleteItems, getItems, postItems } from "../../utils/api";
function App() {
  const [metric, setMetric] = useState("F");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const handleAddClick = () => setActiveModal("add-garment");
  const [selectedCard, setSelectedCard] = useState({});
  const closeActiveModal = () => {
    setActiveModal("");
  };

  const onAddItem = (data) => {
    const newCardData = {
      name: data.name,
      imageUrl: data.imageUrl,
      weather: data.weather,
    };

    postItems(newCardData)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to create item:", error);
      });
  };
  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") {
      setCurrentTemperatureUnit("C");
    } else {
      setCurrentTemperatureUnit("F");
    }
  };

  const deleteItemHandler = () => {
    deleteItems(selectedCard._id)
      .then((data) => {
        setClothingItems(
          clothingItems.filter((item) => {
            return item._id !== selectedCard._id;
          })
        );
        closeActiveModal();
      })
      .catch(console.error);
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

    getItems()
      .then((data) => {
        const sortedData = data.sort((a, b) => b._id - a._id);
        setClothingItems(sortedData);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ handleToggleSwitchChange, currentTemperatureUnit }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            ToggleSwitch={ToggleSwitch}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/Profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>
          <Footer />

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            closeActiveModal={closeActiveModal}
            onAddItem={onAddItem}
            formFilled={formFilled}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            closeActiveModal={closeActiveModal}
            deleteItemHandler={deleteItemHandler}
          />
        </div>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
