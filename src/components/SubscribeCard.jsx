import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function SubscribeCard() {
  return (
    <div className="flex flex-col h-full justify-center p-2 bg-gray-800 rounded-xl relative overflow-hidden">
      <h2 className="text-white text-md font-semibold mb-1">Subscribe</h2>
      <p className="text-gray-300 text-xs">
        Stay updated with daily weather alerts.
      </p>
      <button className="absolute top-2 right-2 w-6 h-6 bg-black bg-opacity-40 rounded-full flex items-center justify-center hover:bg-opacity-60">
        <ArrowUpRight className="text-white w-3 h-3" />
      </button>
    </div>
  );
}
