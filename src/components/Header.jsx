import { Search, User } from "lucide-react";
import React, { useState } from "react";

const Header = () => {
  const [isCelsius, setIsCelsius] = useState(true);

  return (
    <header className="flex justify-between items-center px-6 rounded-t-2xl">
      {/* Left */}
      <div>
        <div className="flex items-center gap-1">
          <User size={16} className="text-gray-400" />
          <p className="text-gray-400 text-xs">Hi, Elizabeth</p>
        </div>
        <h1 className="text-white text-sm font-medium">Mon, 15 May, 2023</h1>
      </div>

      {/* searchbar  */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center bg-gray-800 rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Search city or postcode"
            className="bg-gray-800 text-white pl-3 pr-2 py-1.5 w-48 text-xs focus:outline-none rounded-l-full"
          />
          <button className="bg-blue-600 p-2 hover:bg-blue-500 transition rounded-r-full">
            <Search size={14} className="text-white" />
          </button>
        </div>

        {/* C/F Toggle */}
        <div
          onClick={() => setIsCelsius(!isCelsius)}
          className="relative flex items-center w-20 h-8 bg-gray-700 rounded-full cursor-pointer transition-colors"
        >
          <span
            className={`absolute top-1 left-1 w-8 h-6 bg-blue-600 rounded-full shadow-md transform transition-transform duration-300 ${
              isCelsius ? "translate-x-0" : "translate-x-10"
            }`}
          ></span>

          <span
            className={`flex-1 text-center text-xs font-semibold z-10 transition-colors ${
              isCelsius ? "text-white" : "text-gray-300"
            }`}
          >
            °C
          </span>
          <span
            className={`flex-1 text-center text-xs font-semibold z-10 transition-colors ${
              !isCelsius ? "text-white" : "text-gray-300"
            }`}
          >
            °F
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
