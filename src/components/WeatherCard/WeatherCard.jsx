import "./WeatherCard.css";
import Sunny from "../../assets/Sunny.png";
function WeatherCard({ weatherData }) {
  return (
    <section className="weather__card">
      <p className="weather__card-temperature">{weatherData.temp.F} &deg; F</p>
      <img src={Sunny} alt="weather card" className="weather__card-image" />
    </section>
  );
}

export default WeatherCard;
