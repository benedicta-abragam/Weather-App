import { useState } from "react";
import axios from "axios";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "743583d2b5e14f2a71c2b5251eb6c30a";

  function getWeather() {
    if (city === "") {
      setError("Please enter a city name");
      return;
    }

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      .then((res) => {
        setWeather(res.data);
        setError("");
        setCity("");

      })
      .catch(() => {
        setError("City not found");
        setWeather(null);
      });
  }

  return (
    <div className="weather-container">
      <h1>Weather App 🌤️</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

     {weather && (
  <div className="weather-card">
    <h2>{weather.name}</h2>

    <div className="temperature">
      {weather.main.temp}°C
    </div>

    <p className="description">
      {weather.weather[0].description}
    </p>

    <div className="humidity">
      Humidity: {weather.main.humidity}%
    </div>
  </div>
)}
    </div>
  );
}

export default Weather;
