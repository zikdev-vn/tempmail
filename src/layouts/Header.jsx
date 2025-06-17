import React from "react";

export default function Header() {
  return (
    <nav className="bg-gray-900 px-4 py-4 rounded mt-2 w-84">
      <div className="relative flex items-center justify-between">
        <div className="flex items-center justify-center">
          <i className="bx bx-menu text-white text-2xl"></i>
        </div>

        <div
          className="font-bold text-white absolute inset-y-0"
          style={{ left: "50%", transform: "translateX(-50%)" }}
        >
          Abstract UI
        </div>

        <div className="flex items-center justify-center">
          <i className="bx bxs-envelope text-white text-2xl"></i>
          <i className="bx bx-trending-up text-white text-2xl ml-6"></i>
        </div>
      </div>
    </nav>
  );
}

