import React, { useState } from "react";
import Navside from "./Navside";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [asideOpen, setAsideOpen] = useState(true);

  return (
    <div className="min-h-screen w-full bg-gray-100 text-gray-700">
      {/* Header */}
      <header className="flex w-full items-center justify-between border-b-2 border-gray-200 bg-white p-2">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="text-3xl"
            onClick={() => setAsideOpen(!asideOpen)}
          >
            <i className="bx bx-menu"></i>
          </button>
          <div>ZIKDEV</div>
        </div>
      </header>

      <div className="flex">
        <Navside asideOpen={asideOpen} />
        <main className="w-full p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
