import React from "react";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 py-1 backdrop-blur-lg border-b border-purple-700/80">
      <div className=" mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
          <span className="text-gray-400 font-medium pt-1">DoctorKays</span>
        </div>
        <button
          aria-label="Beta release"
          className="p-1 rounded-md bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <span className="text-xs font-semibold text-purple-700 font-sans">BETA</span>
        </button>
      </div>
    </nav>
  );
}
