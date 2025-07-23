import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null;

 const {
  name,
  main: { temp, feels_like, humidity, pressure },
  weather: [{ description, icon }], 
  wind: { speed },
  sys: { country, sunrise, sunset },
  visibility
} = weatherData;

  // Zamanı formatla
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Hava durumu ikonunu getir
  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div className="location">
          <h2>{name}, {country}</h2>
          <p className="date">{new Date().toLocaleDateString('tr-TR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</p>
        </div>
      </div>

      <div className="weather-main">
        <div className="temperature-section">
          <img 
            src={getWeatherIcon(icon)} 
            alt={description}
            className="weather-icon"
          />
          <div className="temperature">
            <span className="temp-value">{Math.round(temp)}°</span>
            <div className="temp-details">
              <p className="description">{description}</p>
              <p className="feels-like">Hissedilen: {Math.round(feels_like)}°</p>
            </div>
          </div>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Nem</span>
            <span className="detail-value">{humidity}%</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Rüzgar</span>
            <span className="detail-value">{speed} m/s</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Basınç</span>
            <span className="detail-value">{pressure} hPa</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Görüş</span>
            <span className="detail-value">{visibility / 1000} km</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Gündoğumu</span>
            <span className="detail-value">{formatTime(sunrise)}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Günbatımı</span>
            <span className="detail-value">{formatTime(sunset)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;