// App.jsx
import React, { useEffect, useState, useCallback, useMemo } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CurrentWeather from "./components/CurrentWeather";
import WorldMap from "./components/WorldMap";
import LineChartWithToggle from "./components/LineChartWithToggle";
import Forecast from "./components/Forecast";
import OverviewChart from "./components/OverviewChart";
import WorldForecast from "./components/WorldForecast";
import {
  getCurrentWeather,
  getForecast,
  getAirQuality,
} from "./services/weatherService";

// Custom hook for weather data management
const useWeatherData = (initialCity = "Pune") => {
  const [currentCity, setCurrentCity] = useState(initialCity);
  const [isCelsius, setIsCelsius] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [cache, setCache] = useState(new Map());

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Enhanced fetch with caching and retry logic
  const fetchWeatherData = useCallback(
    async (city = currentCity, retryCount = 0) => {
      if (!city || !isOnline) return;

      const cacheKey = `${city}-${isCelsius}`;
      const now = Date.now();
      const cacheExpiry = 5 * 60 * 1000; // 5 minutes

      // Check cache first
      if (cache.has(cacheKey)) {
        const cached = cache.get(cacheKey);
        if (now - cached.timestamp < cacheExpiry) {
          setWeatherData(cached.weather);
          setForecastData(cached.forecast);
          setAirQualityData(cached.airQuality);
          setCurrentCity(city);
          return;
        }
      }

      setLoading(true);
      setError(null);

      try {
        const [current, forecast, airQuality] = await Promise.all([
          getCurrentWeather(city, isCelsius ? "metric" : "imperial"),
          getForecast(city, isCelsius ? "metric" : "imperial"),
          getAirQuality(city),
        ]);

        // Update state
        setWeatherData(current);
        setForecastData(forecast);
        setAirQualityData(airQuality);
        setCurrentCity(city);

        // Update cache
        setCache(
          (prev) =>
            new Map(
              prev.set(cacheKey, {
                weather: current,
                forecast: forecast,
                airQuality: airQuality,
                timestamp: now,
              })
            )
        );
      } catch (err) {
        // Retry logic with exponential backoff
        if (retryCount < 3) {
          setTimeout(() => {
            fetchWeatherData(city, retryCount + 1);
          }, 1000 * Math.pow(2, retryCount));
        } else {
          setError(err.message);
          console.error("Weather data fetch error:", err);
        }
      } finally {
        setLoading(false);
      }
    },
    [currentCity, isCelsius, cache, isOnline]
  );

  // Initial load and when city/unit changes
  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  const handleCitySearch = (city) => {
    fetchWeatherData(city);
  };

  const handleToggleUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return {
    currentCity,
    isCelsius,
    weatherData,
    forecastData,
    airQualityData,
    loading,
    error,
    isOnline,
    handleCitySearch,
    handleToggleUnit,
    fetchWeatherData,
  };
};

export default function App() {
  const [favoriteCities, setFavoriteCities] = useState([
    "Pune",
    "Mumbai",
    "Delhi",
  ]);

  const {
    currentCity,
    isCelsius,
    weatherData,
    forecastData,
    airQualityData,
    loading,
    error,
    isOnline,
    handleCitySearch,
    handleToggleUnit,
    fetchWeatherData,
  } = useWeatherData();

  const addFavoriteCity = (city) => {
    if (!favoriteCities.includes(city)) {
      setFavoriteCities((prev) => [...prev, city]);
    }
  };

  const removeFavoriteCity = (city) => {
    setFavoriteCities((prev) => prev.filter((c) => c !== city));
  };

  // Memoized favorite cities to prevent unnecessary re-renders
  const memoizedFavoriteCities = useMemo(
    () => favoriteCities,
    [favoriteCities]
  );

  if (error) {
    return (
      <div className="bg-[#1C2128] h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Weather Service Unavailable
          </h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => fetchWeatherData()}
            className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-500 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-[#1C2128] h-screen flex font-sans p-2 overflow-hidden"
      role="application"
      aria-label="Weather Dashboard"
    >
      <div className="flex w-full max-w-screen-2xl mx-auto bg-[#1C2128] rounded-3xl h-full gap-x-4">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-[#1C2128] rounded-r-3xl overflow-hidden min-h-0">
          {/* Header fixed at top */}
          <Header
            onCitySearch={handleCitySearch}
            isCelsius={isCelsius}
            onToggleUnit={handleToggleUnit}
            loading={loading}
            isOnline={isOnline}
          />

          {/* Offline indicator */}
          {!isOnline && (
            <div
              className="bg-yellow-600 text-white text-center py-1 text-sm"
              role="alert"
            >
              You are currently offline. Showing cached data.
            </div>
          )}

          {/* Main grid fills remaining space */}
          <main className="flex-1 grid grid-cols-1 md:grid-cols-12 grid-rows-[auto] bg-[#1C2128] gap-3 min-h-0">
            {/* Row 1 */}
            <section
              className="md:col-span-8 bg-gray-800 rounded-2xl flex flex-col min-h-0 overflow-hidden"
              aria-labelledby="current-weather-title"
            >
              <CurrentWeather
                weatherData={weatherData}
                forecastData={forecastData}
                isCelsius={isCelsius}
                loading={loading}
                airQuality={airQualityData}
              />
            </section>

            <section
              className="md:col-span-4 bg-gray-800 rounded-2xl flex flex-col min-h-0 overflow-hidden"
              aria-labelledby="world-map-title"
            >
              <WorldMap
                currentCity={currentCity}
                onCityClick={handleCitySearch}
              />
            </section>

            {/* Row 2 */}
            <section
              className="md:col-span-8 bg-gray-800 rounded-2xl flex flex-col min-h-0 overflow-hidden"
              aria-labelledby="weather-overview-title"
            >
              <LineChartWithToggle
                city={currentCity}
                forecastData={forecastData}
                isCelsius={isCelsius}
              />
            </section>

            <section
              className="md:col-span-4 bg-gray-800 rounded-2xl flex flex-col min-h-0 overflow-hidden"
              aria-labelledby="forecast-title"
            >
              <Forecast
                forecastData={forecastData}
                isCelsius={isCelsius}
                loading={loading}
              />
            </section>

            {/* Row 3 */}
            <section
              className="md:col-span-8 bg-gray-800 rounded-2xl flex flex-col min-h-0 overflow-hidden"
              aria-labelledby="world-forecast-title"
            >
              <WorldForecast
                favoriteCities={memoizedFavoriteCities}
                onAddCity={addFavoriteCity}
                onRemoveCity={removeFavoriteCity}
                isCelsius={isCelsius}
              />
            </section>

            <section
              className="md:col-span-4 bg-gray-800 rounded-2xl flex flex-col min-h-0 overflow-hidden"
              aria-labelledby="analytics-title"
            >
              <OverviewChart />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
