import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CurrentWeather from "./components/CurrentWeather";
import WorldMap from "./components/WorldMap";
import LineChartWithToggle from "./components/LineChartWithToggle";
import Forecast from "./components/Forecast";
import WorldForecast from "./components/WorldForecast";
import SubscribeCard from "./components/SubscribeCard";

export default function App() {
  return (
    <div className="bg-[#1C2128] h-screen flex font-sans p-2 overflow-hidden">
      <div className="flex w-full max-w-screen-2xl mx-auto bg-[#1C2128] rounded-3xl h-full gap-x-4">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-[#1C2128] rounded-r-3xl overflow-hidden min-h-0 gap-2">
          {/* Header fixed at top */}
          <Header />

          {/* Main grid fills remaining space */}
          <main className="flex-1 grid grid-cols-12 bg-[#1C2128] gap-4 min-h-0">
            {/* Row 1 */}
            <section className="col-span-8 bg-gray-800 rounded-2xl flex flex-col min-h-0">
              <CurrentWeather />
            </section>

            <section className="col-span-4 bg-gray-800 rounded-2xl flex flex-col min-h-0 overflow-hidden p-2">
              <WorldMap />
            </section>

            {/* Row 2 */}
            <section className="col-span-8 bg-gray-800 rounded-2xl flex flex-col min-h-0 overflow-hidden">
              <LineChartWithToggle />
            </section>

            <section className="col-span-4 bg-gray-800 rounded-2xl flex flex-col min-h-0 overflow-hidden p-2">
              <Forecast />
            </section>

            {/* Row 3 */}
            <section className="col-span-8 bg-gray-800 rounded-2xl flex flex-col min-h-0 overflow-hidden">
              <WorldForecast />
            </section>

            <section className="col-span-4 bg-gray-800 rounded-2xl flex flex-col min-h-0 overflow-hidden">
              <SubscribeCard />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
