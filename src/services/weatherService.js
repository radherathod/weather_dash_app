const API_KEY =
  import.meta.env.VITE_OPENWEATHER_API_KEY ||
  "a4213f49648402d6fa1792c7ee7958f2";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

if (!API_KEY) {
  console.error(
    "VITE_OPENWEATHER_API_KEY is not defined. Please add it to your .env file."
  );
}

// Enhanced fetch with timeout and retry logic
const fetchWithRetry = async (url, retries = 3, timeout = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      // Wait before retrying (exponential backoff)
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};

const getCityCoordinates = async (city) => {
  const response = await fetchWithRetry(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}`
  );

  if (!response) {
    throw new Error("City not found or service unavailable");
  }

  return {
    lat: response.coord.lat,
    lon: response.coord.lon,
    name: response.name,
    country: response.sys.country,
  };
};

export const getCurrentWeather = async (city, units = "metric") => {
  const data = await fetchWithRetry(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${units}`
  );

  return {
    city: data.name,
    country: data.sys.country,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    windSpeed: Math.round(data.wind.speed * 3.6), // Convert to km/h
    windDirection: data.wind.deg,
    condition: data.weather[0].main,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    visibility: (data.visibility / 1000).toFixed(1),
    sunrise: new Date(data.sys.sunrise * 1000),
    sunset: new Date(data.sys.sunset * 1000),
    high: Math.round(data.main.temp_max),
    low: Math.round(data.main.temp_min),
    timestamp: new Date(),
  };
};

export const getForecast = async (city, units = "metric") => {
  const data = await fetchWithRetry(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=${units}`
  );

  // Process hourly data (next 12 hours, 12 items * 3-hour intervals)
  const hourly = data.list.slice(0, 12).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    }),
    temp: Math.round(item.main.temp),
    condition: item.weather[0].main,
    icon: item.weather[0].icon,
    pop: Math.round(item.pop * 100),
    humidity: item.main.humidity,
    windSpeed: Math.round(item.wind.speed * 3.6),
  }));

  // Process daily data (next 5 days)
  const dailyForecasts = {};
  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!dailyForecasts[date]) {
      dailyForecasts[date] = item;
    }
  });

  const daily = Object.values(dailyForecasts)
    .slice(0, 5)
    .map((day) => ({
      date: new Date(day.dt * 1000),
      day: new Date(day.dt * 1000).toLocaleDateString("en-US", {
        weekday: "short",
      }),
      temp: Math.round(day.main.temp),
      condition: day.weather[0].main,
      icon: day.weather[0].icon,
      description: day.weather[0].description,
      pop: Math.round(day.pop * 100),
      humidity: day.main.humidity,
      windSpeed: Math.round(day.wind.speed * 3.6),
      high: Math.round(day.main.temp_max),
      low: Math.round(day.main.temp_min),
    }));

  return { hourly, daily };
};

export const getAirQuality = async (city) => {
  try {
    const coords = await getCityCoordinates(city);
    const data = await fetchWithRetry(
      `${BASE_URL}/air_pollution?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
    );

    const aqi = data.list[0].main.aqi;

    const aqiLevels = {
      1: { level: "Good", color: "text-green-400", bg: "bg-green-500/20" },
      2: { level: "Fair", color: "text-yellow-400", bg: "bg-yellow-500/20" },
      3: {
        level: "Moderate",
        color: "text-orange-400",
        bg: "bg-orange-500/20",
      },
      4: { level: "Poor", color: "text-red-400", bg: "bg-red-500/20" },
      5: {
        level: "Very Poor",
        color: "text-purple-400",
        bg: "bg-purple-500/20",
      },
    };

    return {
      aqi,
      level: aqiLevels[aqi]?.level || "Unknown",
      color: aqiLevels[aqi]?.color || "text-gray-400",
      bg: aqiLevels[aqi]?.bg || "bg-gray-500/20",
      components: data.list[0].components,
    };
  } catch (error) {
    console.error("Air quality data unavailable:", error);
    return null;
  }
};

export const getWeatherByCoords = async (lat, lon, units = "metric") => {
  return await fetchWithRetry(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
  );
};
