import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setSearchTerm('');
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Şehir adı girin..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            <svg 
              className="search-icon" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </button>
        </div>
      </form>
      
      <div className="quick-cities">
        <span className="quick-cities-label">Hızlı Erişim:</span>
        <button 
          className="quick-city-btn" 
          onClick={() => onSearch('Istanbul')}
        >
          İstanbul
        </button>
        <button 
          className="quick-city-btn" 
          onClick={() => onSearch('Ankara')}
        >
          Ankara
        </button>
        <button 
          className="quick-city-btn" 
          onClick={() => onSearch('Izmir')}
        >
          İzmir
        </button>
        <button 
          className="quick-city-btn" 
          onClick={() => onSearch('Antalya')}
        >
          Antalya
        </button>
      </div>
    </div>
  );
};

export default SearchBar;