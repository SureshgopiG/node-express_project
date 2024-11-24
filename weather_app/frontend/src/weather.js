import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getWeather = async () => {
    try {
      setError(''); 
      const response = await axios.get('http://localhost:5000/weather', {
        params: { city },
      });
      setWeather(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('City not found!');
      } else {
        setError('Error fetching weather data');
      }
      setWeather(null); 
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div>
          <h2>Weather in {weather.city}</h2>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Condition: {weather.weather}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
