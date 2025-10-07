import React, { memo, useMemo } from "react";
import { Droplet, Wind, Thermometer, CloudRain } from "lucide-react";
import WeatherIcon from "./WeatherIcon";

const Forecast = memo(({ forecastData, isCelsius, loading }) => {
  const processedData = useMemo(() => {
    if (!forecastData?.daily) return null;

    return forecastData.daily.map((day) => ({
      ...day,
      temp: isCelsius ? day.temp : Math.round((day.temp * 9) / 5 + 32),
      high: isCelsius ? day.high : Math.round((day.high * 9) / 5 + 32),
      low: isCelsius ? day.low : Math.round((day.low * 9) / 5 + 32),
    }));
  }, [forecastData, isCelsius]);

  const formatDate = useMemo(
    () => (date) => {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    },
    []
  );

  const mapConditionToIcon = useMemo(
    () => (cond) => {
      switch (cond) {
        case "Clear":
          return "Clear";
        case "Clouds":
          return "Clouds";
        case "Rain":
          return "Rain";
        case "Drizzle":
          return "Drizzle";
        case "Thunderstorm":
          return "Thunderstorm";
        case "Snow":
          return "Snow";
        default:
          return "Clouds";
      }
    },
    []
  );

  if (loading) {
    return (
      <div
        className="flex flex-col h-full p-4"
        role="status"
        aria-label="Loading forecast"
      >
        <h2 className="text-white text-lg font-bold mb-4" id="forecast-title">
          5-Day Forecast
        </h2>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div
              className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"
              aria-hidden="true"
            ></div>
            <p className="text-gray-400 text-sm">Loading forecast...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!processedData) {
    return (
      <div className="flex flex-col h-full p-4">
        <h2 className="text-white text-lg font-bold mb-4" id="forecast-title">
          5-Day Forecast
        </h2>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400">No forecast data available</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col h-full"
      role="region"
      aria-labelledby="forecast-title"
    >
      <h2
        className="text-white text-lg font-bold mb-2 px-4 pt-4"
        id="forecast-title"
      >
        5-Day Forecast
      </h2>

      <div className="flex-1 overflow-y-auto px-2 pb-2">
        <div
          className="space-y-2"
          role="list"
          aria-label="5-day weather forecast"
        >
          {processedData.map((day, idx) => (
            <div
              key={`${day.date}-${idx}`}
              className="flex items-center justify-between bg-gray-700/40 p-3 rounded-xl hover:bg-gray-700 transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500"
              role="listitem"
              tabIndex={0}
              aria-label={`${day.day}: ${day.temp} degrees, ${day.description}, High: ${day.high} degrees, Low: ${day.low} degrees`}
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="text-center min-w-[45px] flex-shrink-0">
                  <div className="text-white font-semibold text-sm">
                    {day.day}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {formatDate(day.date)}
                  </div>
                </div>
                <WeatherIcon
                  name={mapConditionToIcon(day.condition)}
                  className="w-8 h-8 flex-shrink-0"
                  aria-hidden="true"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm capitalize truncate">
                    {day.description}
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-gray-400 mt-1 flex-wrap gap-y-1">
                    <div
                      className="flex items-center space-x-1"
                      aria-label={`Humidity: ${day.humidity}%`}
                    >
                      <Droplet size={12} aria-hidden="true" />
                      <span>{day.humidity}%</span>
                    </div>
                    <div
                      className="flex items-center space-x-1"
                      aria-label={`Wind speed: ${day.windSpeed} km/h`}
                    >
                      <Wind size={12} aria-hidden="true" />
                      <span>{day.windSpeed} km/h</span>
                    </div>
                    {day.pop > 0 && (
                      <div
                        className="flex items-center space-x-1 text-blue-400"
                        aria-label={`Precipitation probability: ${day.pop}%`}
                      >
                        <CloudRain size={12} aria-hidden="true" />
                        <span>{day.pop}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <div
                  className="text-white text-lg font-bold"
                  aria-label={`Temperature: ${day.temp} degrees`}
                >
                  {day.temp}°
                </div>
                <div
                  className="flex items-center space-x-1 text-xs text-gray-400"
                  aria-label={`High: ${day.high} degrees, Low: ${day.low} degrees`}
                >
                  <Thermometer size={10} aria-hidden="true" />
                  <span>
                    H:{day.high}° L:{day.low}°
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

Forecast.displayName = "Forecast";

export default Forecast;
