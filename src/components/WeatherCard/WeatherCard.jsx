import "./WeatherCard.css";
import Sunny from "../../assets/Sunny.png";
import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";
import { useContext } from "react";
function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <section className="weather__card">
      <p className="weather__card-temperature">
        {currentTemperatureUnit === "F"
          ? weatherData.temp.F
          : weatherData.temp.C}
        &deg; {currentTemperatureUnit}
      </p>
      <img src={Sunny} alt="weather card" className="weather__card-image" />
    </section>
  );
}

export default WeatherCard;
