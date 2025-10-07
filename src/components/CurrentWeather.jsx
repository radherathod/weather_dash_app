import React from "react";
import WeatherIcon from "./WeatherIcon";

const CurrentWeather = ({
  weatherData,
  forecastData,
  isCelsius,
  airQuality,
}) => {
  if (!weatherData || !forecastData) {
    return (
      <div className="text-white font-sans rounded-2xl shadow-2xl w-full h-full p-3 flex items-center justify-center">
        <p className="text-gray-400">Loading current weather...</p>
      </div>
    );
  }

  const { city, country, temperature, humidity, windSpeed, condition } =
    weatherData;
  const { hourly } = forecastData;

  const convertTemp = (temp) => {
    if (!isCelsius) {
      return Math.round((temp * 9) / 5 + 32);
    }
    return temp;
  };

  const mapConditionToIcon = (cond) => {
    switch (cond) {
      case "Clear":
        return "Clear";
      case "Clouds":
        return "Clouds";
      case "Rain":
        return "Rain";
      case "Drizzle":
        return "Rain";
      case "Thunderstorm":
        return "Thunderstorm";
      case "Snow":
        return "Snow";
      case "Mist":
      case "Smoke":
      case "Haze":
      case "Dust":
      case "Fog":
      case "Sand":
      case "Ash":
        return "Mist";
      default:
        return "Clouds";
    }
  };

  const hourlyData = (hourly || []).map((hour) => ({
    // hourly now contains 12 items from weatherService
    ...hour,
    temp: convertTemp(hour.temp),
    icon: mapConditionToIcon(hour.condition),
  }));
  return (
    <div className="text-white font-sans rounded-2xl shadow-2xl w-full h-full p-2 flex flex-col space-y-3">
      <div className="flex items-center justify-between flex-wrap">
        {/* City Info */}
        <div className="flex items-center">
          <WeatherIcon
            name={mapConditionToIcon(condition)}
            className="w-20 h-20 -ml-2"
          />
          <div className="ml-2">
            <h2 className="text-xl font-bold leading-tight">{city}</h2>
            <p className="text-gray-400 text-xs">{country}</p>
          </div>
        </div>

        {/* Weather Stats */}
        <div className="flex items-center space-x-5 text-center">
          <div>
            <p className="text-xl font-semibold">
              {convertTemp(temperature)}°{isCelsius ? "C" : "F"}
            </p>{" "}
            <p className="text-gray-400 text-xs">Temp</p>
          </div>
          <div>
            <p className="text-xl font-semibold">{humidity}%</p>
            <p className="text-gray-400 text-xs">Humidity</p>
          </div>
          <div>
            <p className="text-xl font-semibold">
              {windSpeed}
              <span className="text-sm align-middle">km/h</span>
            </p>
            <p className="text-gray-400 text-xs">Wind</p>
          </div>
        </div>
      </div>

      {/* Hourly Forecast - Smooth Horizontal Scroll */}
      <div
        className="flex overflow-x-auto scrollbar-hide space-x-3 pb-2 snap-x snap-mandatory scroll-smooth"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {hourlyData.map((hour, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-3 bg-white/10 rounded-2xl min-w-[64px] snap-center hover:bg-white/20 transition"
          >
            <p className="text-[11px] text-gray-300">{hour.time}</p>
            <WeatherIcon name={hour.icon} className="w-12 h-10 my-1" />
            <p className="text-sm font-semibold">{hour.temp}°</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentWeather;
