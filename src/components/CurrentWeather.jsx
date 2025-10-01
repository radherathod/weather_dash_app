import React from "react";

const WeatherIcon = ({ name, className }) => {
  const icons = {
    CloudySun: (
      <svg
        viewBox="0 0 64 64"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="blur" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
            <feOffset in="blur" dx="0" dy="4" result="offsetBlur" />
            <feComponentTransfer in="offsetBlur" result="shadow">
              <feFuncA type="linear" slope="0.5" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g filter="url(#blur)" transform="translate(5, 5)">
          <g transform="translate(0,16)">
            <path
              d="M47.7,35.4c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7
              c0,0.8,0.2,1.6,0.4,2.3c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z"
              fill="#E6E6E6"
              stroke="white"
              strokeLinejoin="round"
              strokeWidth="1.2"
            />
          </g>
          <circle
            cx="24"
            cy="18"
            r="7"
            fill="#FDB813"
            stroke="#FDB813"
            strokeWidth="2"
          />
        </g>
      </svg>
    ),
    PartlyCloudy: (
      <svg
        viewBox="0 0 64 64"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#blur)" transform="translate(10, 10) scale(0.8)">
          <g transform="translate(0,16)">
            <g className="am-weather-sun">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <g key={i} transform={`rotate(${angle})`}>
                  <line
                    fill="none"
                    stroke="#FDB813"
                    strokeLinecap="round"
                    strokeWidth="2"
                    transform="translate(0,9)"
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="3"
                  />
                </g>
              ))}
            </g>
            <circle
              cx="0"
              cy="0"
              fill="#FDB813"
              r="5"
              stroke="#FDB813"
              strokeWidth="2"
            />
          </g>
          <path
            d="M47.7,35.4c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7
          c0,0.8,0.2,1.6,0.4,2.3c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0
          C44.2,43.3,47.7,39.8,47.7,35.4z"
            fill="#E6E6E6"
            stroke="white"
            strokeLinejoin="round"
            strokeWidth="1.2"
          />
        </g>
      </svg>
    ),
    Rain: (
      <svg
        viewBox="0 0 64 64"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#blur)" transform="translate(10, 10) scale(0.8)">
          <path
            d="M47.7,35.4c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7
            c0,0.8,0.2,1.6,0.4,2.3c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0
            C44.2,43.3,47.7,39.8,47.7,35.4z"
            fill="#57A0EE"
            stroke="white"
            strokeLinejoin="round"
            strokeWidth="1.2"
          />
          <g>
            <line
              fill="none"
              stroke="#4B89D6"
              strokeLinecap="round"
              strokeWidth="2"
              transform="translate(-5,10)"
              x1="0"
              x2="0"
              y1="0"
              y2="5"
            />
            <line
              fill="none"
              stroke="#4B89D6"
              strokeLinecap="round"
              strokeWidth="2"
              transform="translate(0,10)"
              x1="0"
              x2="0"
              y1="0"
              y2="5"
            />
            <line
              fill="none"
              stroke="#4B89D6"
              strokeLinecap="round"
              strokeWidth="2"
              transform="translate(5,10)"
              x1="0"
              x2="0"
              y1="0"
              y2="5"
            />
          </g>
        </g>
      </svg>
    ),
  };

  return icons[name] || null;
};

// Main Component
const CurrentWeather = () => {
  const hourlyData = [
    { time: "09 am", icon: "PartlyCloudy", temp: 17 },
    { time: "10 am", icon: "PartlyCloudy", temp: 21 },
    { time: "11 am", icon: "PartlyCloudy", temp: 21 },
    { time: "12 pm", icon: "Rain", temp: 24 },
    { time: "01 pm", icon: "PartlyCloudy", temp: 24 },
    { time: "02 pm", icon: "PartlyCloudy", temp: 24 },
    { time: "03 pm", icon: "Rain", temp: 26 },
    { time: "04 pm", icon: "PartlyCloudy", temp: 24 },
    { time: "05 pm", icon: "PartlyCloudy", temp: 22 },
    { time: "06 pm", icon: "PartlyCloudy", temp: 21 },
    { time: "07 pm", icon: "PartlyCloudy", temp: 19 },
    { time: "08 pm", icon: "PartlyCloudy", temp: 18 },
  ];

  return (
    <div className="text-white font-sans rounded-2xl shadow-2xl w-full h-full p-3 flex flex-col space-y-3">
      {/* Top Section */}
      <div className="flex items-center justify-between flex-wrap">
        {/* City Info */}
        <div className="flex items-center">
          <WeatherIcon name="CloudySun" className="w-16 h-14 -ml-1 pb-2" />
          <div className="ml-2">
            <h2 className="text-xl font-bold leading-tight">Berlin</h2>
            <p className="text-gray-400 text-xs">Germany</p>
          </div>
        </div>

        {/* Weather Stats */}
        <div className="flex items-center space-x-5 text-center">
          <div>
            <p className="text-xl font-semibold">+20°</p>
            <p className="text-gray-400 text-xs">Temp</p>
          </div>
          <div>
            <p className="text-xl font-semibold">24%</p>
            <p className="text-gray-400 text-xs">Humidity</p>
          </div>
          <div>
            <p className="text-xl font-semibold">
              13<span className="text-sm align-middle">km/h</span>
            </p>
            <p className="text-gray-400 text-xs">Wind</p>
          </div>
        </div>
      </div>

      {/* Hourly Forecast - Smooth Horizontal Scroll */}
      <div className="flex overflow-x-auto scrollbar-hide space-x-3 pb-2 snap-x snap-mandatory scroll-smooth">
        {hourlyData.map((hour, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-3 bg-white/10 rounded-2xl min-w-[64px] snap-center hover:bg-white/20 transition"
          >
            <p className="text-[11px] text-gray-300">{hour.time}</p>
            <WeatherIcon name={hour.icon} className="w-8 h-8 my-1" />
            <p className="text-sm font-semibold">{hour.temp}°</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentWeather;
