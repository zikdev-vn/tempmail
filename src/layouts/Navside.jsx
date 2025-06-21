import React, { useState, useEffect, useRef } from "react";
import "boxicons/css/boxicons.min.css";
import { Link, Outlet } from "react-router-dom";
import AuthForm from "../features/Auth/AuthForm";
import MyProfile from "../features/Profile/MyProfile";
import EditProfileForm from "../features/Profile/EditProfile";
import SettingsForm from "../features/Profile/Setting";
import ModalWrapper from "../components/Common/ModelWrapper"; 


const Navside = () => {
   const [activeForm, setActiveForm] = useState(null);
  const [asideOpen, setAsideOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
  const [showLoginModal, setShowLoginModal] = useState(false); // Trạng thái hiển thị form login
  const profileDropdownRef = useRef(null);
  const toggleProfileDropdown = () => setProfileOpen(!profileOpen);
  const [user, setUser] = useState(null);
  const handleMyProfile = () => setActiveForm("profile");
const handleEditProfile = () => setActiveForm("edit");
const handleSettingProfile = () => setActiveForm("settings");

  const handleLoginClick = () => {
    setShowLoginModal(true); // Hiển thị form đăng nhập
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false); // Đánh dấu người dùng đã đăng xuất
  };

  // Đóng dropdown khi người dùng nhấp ra ngoài
  const handleClickOutside = (e) => {
    if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
      setProfileOpen(false); // Đóng dropdown khi nhấp ra ngoài
    }
  };

  useEffect(() => {
    // Lắng nghe sự kiện click ngoài
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
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
    <div className="min-h-screen  ">
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
              <div className="font-medium">
                {user ? user.name : 'Guest'}

              </div>
            </div>

            <div className="flex flex-col space-y-3 p-2">
              <Link to="#" onClick={handleMyProfile} className="hover:text-blue-600">My Profile</Link>
<Link to="#" onClick={handleEditProfile} className="hover:text-blue-600">Edit Profile</Link>
<Link to="#" onClick={handleSettingProfile} className="hover:text-blue-600">Settings</Link>

            </div>

            <div className="p-2">

              {isLoggedIn ? (
                <button
                  onClick={handleLogoutClick}
                  className="flex items-center space-x-2 hover:text-blue-600"
                >
                  <i className="bx bx-log-out"></i>
                  <span>Log Out</span>
                </button>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="flex items-center space-x-2 hover:text-blue-600"
                >
                  <i className="bx bx-log-in"></i>
                  <span>Log In</span>
                </button>
              )}
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

      {/* Hiển thị form login khi showLoginModal = true */}
      {showLoginModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setShowLoginModal(false)} // Đóng modal khi nhấp ngoài form
        >
          <div
            className="bg-white p-6 rounded-md shadow-md w-96"
            onClick={(e) => e.stopPropagation()} // Ngừng sự kiện click truyền vào modal con
          >
            <button
              className="absolute top-2 right-2 text-lg font-bold"
              onClick={() => setShowLoginModal(false)}
            >
              X
            </button>
            <AuthForm onSuccess={() => setShowLoginModal(false)} />
          </div>
        </div>
      )}
      {activeForm && (
  <ModalWrapper onClose={() => setActiveForm(null)}>
    {activeForm === "profile" && <MyProfile user={user} />}
    {activeForm === "edit" && <EditProfileForm user={user} />}
    {activeForm === "settings" && <SettingsForm user={user} />}
  </ModalWrapper>
)}


    </div>
  );
};

export default Navside;
