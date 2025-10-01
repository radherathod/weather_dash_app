import { Bell, LogOut, MapPin, Settings, User } from "lucide-react";
import React from "react";

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-14 flex flex-col items-center rounded-2xl p-4">
      {" "}
      {/* Logo */}
      <div className="flex items-center justify-center font-bold text-2xl cursor-pointer mb-10">
        g
      </div>
      {/* Navigation */}
      <nav className="flex flex-col items-center space-y-6 flex-grow">
        <button className="p-2 rounded-lg hover:bg-gray-700 transition">
          <User size={20} />
        </button>
        <button className="p-2 rounded-lg bg-blue-500 text-white shadow-md">
          <MapPin size={20} />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-700 transition">
          <Bell size={20} />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-700 transition">
          <Settings size={20} />
        </button>
      </nav>
      {/* Logout */}
      <div className="mt-auto">
        <button className="p-2 rounded-lg hover:bg-gray-700 transition">
          <LogOut size={20} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
