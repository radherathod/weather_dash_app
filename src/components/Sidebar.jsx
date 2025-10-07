import React, { memo } from "react";
import { Bell, LogOut, MapPin, Settings, User } from "lucide-react";

const Sidebar = memo(() => {
  const menuItems = [
    { icon: User, label: "Profile", active: false },
    { icon: MapPin, label: "Locations", active: true },
    { icon: Bell, label: "Alerts", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  return (
    <aside
      className="bg-gray-800 text-white w-16 flex flex-col items-center rounded-2xl p-4 h-full"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div
        className="flex items-center justify-center font-bold text-2xl cursor-pointer mb-8"
        aria-label="Weather App Logo"
      >
        <div
          className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center"
          aria-hidden="true"
        >
          W
        </div>
      </div>

      {/* Navigation */}
      <nav
        className="flex flex-col items-center space-y-6 flex-grow"
        aria-label="Main menu"
      >
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`p-3 rounded-xl transition-all duration-200 group relative focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                item.active
                  ? "bg-blue-500 text-white shadow-lg"
                  : "hover:bg-gray-700"
              }`}
              aria-label={item.label}
              aria-current={item.active ? "page" : undefined}
            >
              <Icon size={20} aria-hidden="true" />
              <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-auto">
        <button
          className="p-3 rounded-xl hover:bg-gray-700 transition-all duration-200 group relative focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Logout"
        >
          <LogOut size={20} aria-hidden="true" />
          <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;
