import React from "react";

const cities = [
  {
    name: "World forecast",
    desc: "Add cities you are interested in",
    temp: null,
  },
  { name: "Lisbon", country: "Portugal", temp: "23°", low: "15°" },
  { name: "Kyoto", country: "Japan", temp: "29°", low: "16°" },
  { name: "Antalya", country: "Turkiye", temp: "30°", low: "19°" },
  { name: "Kathmandu", country: "Nepal", temp: "28°", low: "17°" },
];

export default function WorldForecast() {
  return (
    <div className="flex flex-col h-full p-2 overflow-hidden">
      <h2 className="text-white text-md font-semibold mb-2">World Forecast</h2>
      <div className="flex space-x-2 overflow-x-auto h-full scrollbar-hide">
        {/* Add cities button */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center w-28 h-full bg-gray-700/40 border-2 border-dashed border-gray-600 rounded-xl text-center text-gray-300 hover:bg-gray-700 transition p-1">
          <span className="text-lg mb-1">＋</span>
          <p className="text-white text-sm font-medium">Add</p>
          <p className="text-xs">{cities[0].desc}</p>
        </div>

        {/* Cities */}
        {cities.slice(1).map((city, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 flex flex-col justify-between w-28 h-full bg-gray-700/60 rounded-xl p-2 hover:bg-gray-700 transition text-white"
          >
            <div>
              <p className="text-sm font-semibold">{city.name}</p>
              <p className="text-xs text-gray-400">{city.country}</p>
            </div>
            <div>
              <p className="text-lg font-bold">{city.temp}</p>
              <p className="text-xs text-gray-400">{city.low}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
