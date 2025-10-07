import React, { useState, useEffect, useCallback, memo } from "react";
import { Plus, X, MapPin } from "lucide-react";
import { getCurrentWeather } from "../services/weatherService";

const WorldForecast = memo(
  ({ favoriteCities, onAddCity, onRemoveCity, isCelsius }) => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCity, setNewCity] = useState("");
    const [citiesWeather, setCitiesWeather] = useState({});
    const [loadingCities, setLoadingCities] = useState({});

    // Fetch weather for all favorite cities
    useEffect(() => {
      const fetchCitiesWeather = async () => {
        const weatherData = {};
        const loadingStates = {};

        for (const city of favoriteCities) {
          loadingStates[city] = true;
          try {
            const data = await getCurrentWeather(
              city,
              isCelsius ? "metric" : "imperial"
            );
            weatherData[city] = data;
          } catch (error) {
            console.error(`Failed to fetch weather for ${city}:`, error);
            weatherData[city] = null;
          } finally {
            loadingStates[city] = false;
          }
        }

        setLoadingCities(loadingStates);
        setCitiesWeather(weatherData);
      };

      if (favoriteCities.length > 0) {
        fetchCitiesWeather();
      }
    }, [favoriteCities, isCelsius]);

    const handleAddCity = async () => {
      if (newCity.trim()) {
        try {
          await getCurrentWeather(newCity);
          onAddCity(newCity);
          setNewCity("");
          setShowAddForm(false);
        } catch (error) {
          alert(`City "${newCity}" not found. Please check the spelling.`);
        }
      }
    };

    const getWeatherIcon = useCallback((condition) => {
      const icons = {
        Clear: "☀️",
        Clouds: "☁️",
        Rain: "🌧️",
        Drizzle: "🌦️",
        Thunderstorm: "⛈️",
        Snow: "❄️",
        Mist: "🌫️",
        Fog: "🌫️",
      };
      return icons[condition] || "🌤️";
    }, []);

    const handleKeyPress = useCallback(
      (e) => {
        if (e.key === "Enter") {
          handleAddCity();
        } else if (e.key === "Escape") {
          setShowAddForm(false);
          setNewCity("");
        }
      },
      [handleAddCity]
    );

    return (
      <div
        className="flex flex-col h-full p-2 overflow-hidden"
        role="region"
        aria-label="World Forecast"
      >
        <h2
          className="text-white text-lg font-bold mb-2"
          id="world-forecast-title"
        >
          World Forecast
        </h2>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2 overflow-y-auto scrollbar-hide h-full">
          {/* Add City Card */}
          {showAddForm ? (
            <div className="flex flex-col items-center justify-center bg-gray-700 rounded-xl p-2 min-h-[100px]">
              <input
                type="text"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter city"
                className="w-full bg-gray-600 text-white text-sm p-1 rounded mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
                aria-label="City name"
              />
              <div className="flex space-x-1">
                <button
                  onClick={handleAddCity}
                  className="bg-green-500 text-white text-xs px-2 py-0.5 rounded hover:bg-green-600 transition-colors"
                  aria-label="Add city"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-500 text-white text-xs px-2 py-0.5 rounded hover:bg-gray-600 transition-colors"
                  aria-label="Cancel adding city"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex flex-col items-center justify-center bg-gray-700/40 border-2 border-dashed border-gray-600 rounded-xl text-center text-gray-300 hover:bg-gray-700 transition p-2 cursor-pointer min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Add new city to favorites"
            >
              <Plus className="w-5 h-5 mb-1" />
              <p className="text-white text-sm font-medium">Add City</p>
            </button>
          )}

          {/* Favorite Cities */}
          {favoriteCities.map((city, idx) => {
            const weather = citiesWeather[city];
            const isLoading = loadingCities[city];

            return (
              <div
                key={`${city}-${idx}`}
                className="flex flex-col justify-between bg-gray-700/60 rounded-xl p-2 hover:bg-gray-700 transition text-white relative group min-h-[100px] focus-within:ring-2 focus-within:ring-blue-500"
                tabIndex={0}
                role="article"
                aria-label={`Weather for ${city}`}
              >
                {/* Remove Button */}
                <button
                  onClick={() => onRemoveCity(city)}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none"
                  aria-label={`Remove ${city} from favorites`}
                >
                  <X size={12} />
                </button>

                <div>
                  <div className="flex items-center space-x-0.5 mb-1">
                    <MapPin
                      size={12}
                      className="text-blue-400"
                      aria-hidden="true"
                    />
                    <p className="text-sm font-semibold truncate">{city}</p>
                  </div>

                  {isLoading ? (
                    <div
                      className="text-center py-2"
                      aria-label="Loading weather data"
                    >
                      <div
                        className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"
                        aria-hidden="true"
                      ></div>
                    </div>
                  ) : weather ? (
                    <>
                      <div className="text-3xl mb-0.5" aria-hidden="true">
                        {getWeatherIcon(weather.condition)}
                      </div>
                      <p className="text-xs text-gray-400 capitalize">
                        {weather.description}
                      </p>
                    </>
                  ) : (
                    <p className="text-xs text-gray-400">Unavailable</p>
                  )}
                </div>

                <div>
                  {weather && !isLoading ? (
                    <>
                      <p
                        className="text-xl font-bold"
                        aria-label={`Temperature: ${weather.temperature} degrees`}
                      >
                        {weather.temperature}°
                      </p>
                      <p
                        className="text-xs text-gray-400"
                        aria-label={`High: ${weather.high} degrees, Low: ${weather.low} degrees`}
                      >
                        H:{weather.high}° L:{weather.low}°
                      </p>
                    </>
                  ) : (
                    <p className="text-lg font-bold">--°</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

WorldForecast.displayName = "WorldForecast";

export default WorldForecast;
