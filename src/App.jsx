import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [city, setCity] = useState('Istanbul');

  // Hava durumu verilerini getiren fonksiyon
  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError('');
    
    try {
      const API_KEY = process.env.REACT_APP_WEATHER_API_KEY ||'demo-key';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=tr`
      );
      
      if (!response.ok) {
        throw new Error('Şehir bulunamadı');
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  // Sayfa yüklendiğinde İstanbul'un hava durumunu getir
  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const handleSearch = (searchCity) => {
    setCity(searchCity);
    fetchWeatherData(searchCity);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="app-title">Hava Durumu</h1>
        
        <SearchBar onSearch={handleSearch} />
        
        {loading && <LoadingSpinner />}
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        
        {weatherData && !loading && (
          <WeatherCard weatherData={weatherData} />
        )}
      </div>
    </div>
  );
};

export default App;