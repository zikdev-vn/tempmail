// src/components/Navside.jsx
import React, { useState, useEffect } from "react";
import "boxicons/css/boxicons.min.css";
import { Link, Outlet } from "react-router-dom"; // Import Link if you want to use routing


const Navside = () => {
  const [asideOpen, setAsideOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navLinks = [
    { icon: "bx-home", label: "Home", path: "home" },
    { icon: "bx-cart", label: "Cart" },
    { icon: "bx-envelope", label: "TempMail", path: "/tempmail" },
    { icon: "bx-shopping-bag", label: "Shopping" },
    { icon: "bx-heart", label: "My Favourite" },
    { icon: "bx-user", label: "Profile" },

  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setAsideOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen items-center justify-center w-full bg-gray-100 text-gray-700">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex w-full items-center justify-between border-b-2 border-gray-200 bg-white p-2 shadow">

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

        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="h-9 w-9 overflow-hidden rounded-full"
          >
            <img src="https://plchldr.co/i/40x40?bg=111111" alt="avatar" />
          </button>

          <div
            className={`absolute right-0 mt-1 w-48 divide-y divide-gray-200 rounded-md border border-gray-200 bg-white shadow-md z-50 transition-all duration-700 ease-in-out transform
    ${profileOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
  `}
          >
            <div className="flex items-center space-x-2 p-2">
              <img
                src="https://plchldr.co/i/40x40?bg=111111"
                alt="avatar"
                className="h-9 w-9 rounded-full"
              />
              <div className="font-medium">Username</div>
            </div>
            <div className="flex flex-col space-y-3 p-2">
              <Link to="#" className="hover:text-blue-600">My Profile</Link>
              <Link to="#" className="hover:text-blue-600">Edit Profile</Link>
              <Link to="#" className="hover:text-blue-600">Settings</Link>
            </div>
            <div className="p-2">
              <button className="flex items-center space-x-2 hover:text-blue-600">
                <i className="bx bx-log-out"></i>
                <span>Log Out</span>
              </button>
            </div>
          </div>

        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed top-[56px] left-0 h-[calc(100vh-56px)] backdrop-blur-2xl bg-white/90 border-r-2 border-gray-200 p-2 z-40 flex flex-col space-y-2 
    transition-all duration-700 ease-in-out
    ${asideOpen ? 'w-60 translate-x-0 opacity-100 pointer-events-auto' : 'w-0 -translate-x-full opacity-0 pointer-events-none'}
  `}
        >
          {navLinks.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 768) {
                  setAsideOpen(false);
                }
              }}
              className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600"
            >
              <span className="text-2xl">
                <i className={`bx ${item.icon}`}></i>
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
        </aside>

        {/* Nội dung chính sẽ truyền từ App.jsx */}
        <div className="flex-1 pt-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Navside;
