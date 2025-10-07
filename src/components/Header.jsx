import { Search, User, Navigation } from "lucide-react";
import React, { useState } from "react";

const Header = ({
  onCitySearch,
  isCelsius,
  onToggleUnit,
  loading,
  isOnline,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onCitySearch(searchQuery.trim());
      setSearchQuery("");
    }
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=a4213f49648402d6fa1792c7ee7958f2`
            );
            const data = await response.json();
            if (data && data[0]) {
              onCitySearch(data[0].name);
            }
          } catch (error) {
            console.error("Geolocation error:", error);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert(
            "Unable to get your location. Please check location permissions."
          );
        }
      );
    }
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <header
      className="flex justify-between items-center px-6 py-4 rounded-t-2xl"
      role="banner"
    >
      {/* Left */}
      <div>
        <div className="flex items-center gap-2">
          <User size={18} className="text-gray-400" aria-hidden="true" />
          <p className="text-gray-400 text-sm">Hi, Shraddha</p>
        </div>
        <h1 className="text-white text-lg font-medium">{getCurrentDate()}</h1>
      </div>

      {/* Search and Controls */}
      <div className="flex items-center space-x-4">
        {/* Online Status Indicator */}
        {!isOnline && (
          <span className="text-yellow-400 text-sm" aria-label="Offline mode">
            Offline
          </span>
        )}

        {/* Geolocation Button */}
        <button
          onClick={handleGeolocation}
          disabled={loading || !isOnline}
          className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="Use current location"
          aria-label="Get weather for current location"
        >
          <Navigation size={18} className="text-white" aria-hidden="true" />
        </button>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-gray-700 rounded-full overflow-hidden"
          role="search"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search city..."
            disabled={loading || !isOnline}
            className="bg-gray-700 text-white pl-4 pr-2 py-2 w-48 text-sm focus:outline-none rounded-l-full disabled:opacity-50"
            aria-label="Search for a city"
          />
          <button
            type="submit"
            disabled={loading || !searchQuery.trim() || !isOnline}
            className="bg-blue-600 p-2 hover:bg-blue-500 transition rounded-r-full disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search"
          >
            <Search size={16} className="text-white" aria-hidden="true" />
          </button>
        </form>

        {/* Temperature Unit Toggle */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-400 text-sm" aria-hidden="true">
            °C
          </span>
          <button
            onClick={onToggleUnit}
            className="relative flex items-center w-16 h-8 bg-gray-700 rounded-full cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Switch to ${isCelsius ? "Fahrenheit" : "Celsius"}`}
            role="switch"
            aria-checked={!isCelsius}
          >
            <span
              className={`absolute top-1 left-1 w-6 h-6 bg-blue-600 rounded-full shadow-md transform transition-transform duration-300 ${
                isCelsius ? "translate-x-0" : "translate-x-8"
              }`}
              aria-hidden="true"
            ></span>
          </button>
          <span className="text-gray-400 text-sm" aria-hidden="true">
            °F
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
