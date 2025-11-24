import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoutes";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

import * as auth from "../../utils/auth";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { coordinates } from "../../utils/constants";
import { apiKey } from "../../utils/constants";
import { setToken, getToken } from "../../utils/token";
import getWeather from "../../utils/weatherApi";
import { filterWeatherData } from "../../utils/weatherApi";

import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/currentUserContext";
import Profile from "../Profile/Profile";
import {
  deleteItems,
  getItems,
  postItems,
  updateProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    name: "",
    email: "",
    avatar: "",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const handleAddClick = () => setActiveModal("add-garment");
  const handleLogInClick = () => setActiveModal("log-in");
  const handleRegisterClick = () => setActiveModal("register");
  const handleEditProfileClick = () => setActiveModal("edit-profile");
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
    const token = getToken();
    postItems(newCardData, token)
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

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const deleteItemHandler = () => {
    const token = getToken();
    deleteItems(selectedCard._id, token)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => {
            return item._id !== selectedCard._id;
          })
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onEditProfile = (data) => {
    const newProfileData = {
      name: data.name,
      avatar: data.avatar,
    };

    updateProfile(newProfileData)
      .then((data) => {
        setCurrentUser({ ...currentUser, ...data });
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to update profile:", error);
      });
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

  const handleRegistration = ({
    name,
    avatar,
    email,
    password,
    confirmPassword,
  }) => {
    if (password === confirmPassword) {
      auth
        .register(name, avatar, email, password)
        .then(() => {
          return auth
            .authorize(email, password)
            .then((data) => {
              localStorage.setItem("jwt", data.token);
              setCurrentUser(data.user);
              setIsLoggedIn(true);
              closeActiveModal();
            })
            .catch(console.error);
        })
        .catch(console.error);
    }
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    auth
      .authorize(email, password)
      .then((data) => {
        if (data.jwt) {
          setToken(data.jwt);
          setCurrentUser({ email: data.email, name: data.name });
          setIsLoggedIn(true);

          const redirectPath = location.state?.from?.pathname;
          navigate(redirectPath);
        }
      })
      .catch(console.error);
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate("/");
  };
  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    auth
      .checkToken(jwt)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch(console.error);
  }, []);

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
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ handleToggleSwitchChange, currentTemperatureUnit }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              handleLogInClick={handleLogInClick}
              handleRegisterClick={handleRegisterClick}
              handleEditProfileClick={handleEditProfileClick}
              handleSignOut={handleSignOut}
              weatherData={weatherData}
              ToggleSwitch={ToggleSwitch}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/Profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                    />
                  </ProtectedRoute>
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
            <LoginModal
              isOpen={activeModal === "log-in"}
              closeActiveModal={closeActiveModal}
              onLogin={handleLogin}
            />
            <RegisterModal
              isOpen={activeModal === "register"}
              closeActiveModal={closeActiveModal}
              onRegister={handleRegistration}
            />
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onEditProfile={onEditProfile}
              closeActiveModal={closeActiveModal}
            />
          </div>
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
