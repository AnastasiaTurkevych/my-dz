import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './weather.css'

const WeatherTracker = () => {
  const [city, setCity] = useState(''); 
  const [temperature, setTemperature] = useState(null); 
  const [weatherConditions, setWeatherConditions] = useState(''); 
  const [lastUpdate, setLastUpdate] = useState(null); 

  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bc58db13a8de7d95a722b532297669fd&units=metric`
      );

      setTemperature(response.data.main.temp);
      setWeatherConditions(response.data.weather[0].description);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Помилка отримання погодних даних:', error);
    }
  };

  useEffect(() => {
    getWeatherData();
  }, [city]); 

  return (
    <div className="weather-tracker">
      <h2>Weather Tracker</h2>
      <label>
        Виберіть місто:
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Введіть місто"
        />
      </label>

      {temperature !== null && (
        <div>
          <p>Поточна температура: {temperature}°C</p>
          <p>Погодні умови: {weatherConditions}</p>
          <p>Останнє оновлення: {lastUpdate}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherTracker;
