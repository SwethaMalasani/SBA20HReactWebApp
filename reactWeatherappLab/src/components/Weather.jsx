// src/Weather.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [fetchWeather, setFetchWeather] = useState(false);  // New state to trigger weather fetch

  const apiKey = '57882f1ea616822154c6d2c86cdb5883';  // Replace this with your actual API key
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  const getWeatherData = async (city) => {
    try {
      const response = await axios.get(apiUrl, {
        params: {
          q: city,
          appid: apiKey,
          units: 'metric', // To get the temperature in Celsius
        },
      });
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setError('Could not fetch weather data. Please try again.');
      setWeatherData(null);
    }
  };

  // useEffect to fetch weather data when fetchWeather changes to true
  useEffect(() => {
    if (fetchWeather && city) {
      getWeatherData(city);
      setFetchWeather(false);  // Reset fetchWeather after fetching
    }
  }, [fetchWeather, city]);  // Dependency array: when fetchWeather or city changes

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      setFetchWeather(true);  // Set fetchWeather to true to trigger useEffect
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Get Weather</button>
      </form>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}

      <Link to="/about">About this app</Link>
    </div>
  );
};

export default Weather;
