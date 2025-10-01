import React from "react";

const forecastData = [
  { day: "Mon", date: "01 May", temp: "22°C", icon: "☀️" },
  { day: "Tue", date: "02 May", temp: "20°C", icon: "🌤️" },
  { day: "Wed", date: "03 May", temp: "18°C", icon: "🌧️" },
];

function Forecast() {
  return (
    <div className="flex flex-col h-full">
      {/* Header with toggle */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-lg font-bold">Forecast</h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1 rounded-lg text-sm bg-gray-700 text-gray-300 hover:bg-gray-600">
            3 Days
          </button>
          <button className="px-3 py-1 rounded-lg text-sm bg-gray-700 text-gray-300 hover:bg-gray-600">
            5 Days
          </button>
        </div>
      </div>

      {/* Forecast list */}
      <div className="flex-1 overflow-auto">
        <ul className="space-y-1">
          {forecastData.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between bg-gray-700/40 p-2 rounded-3xl hover:bg-gray-700 transition"
            >
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-white font-medium">{item.day}</p>
                  <p className="text-gray-400 text-sm">{item.date}</p>
                </div>
              </div>
              <div className="text-white font-semibold pr-2">{item.temp}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Forecast;
