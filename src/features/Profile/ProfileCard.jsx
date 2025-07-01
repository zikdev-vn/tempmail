import React from 'react';
import zikImage from '../assets/zik.jpg'; // đường dẫn ảnh tùy cấu trúc dự án

const ProfileCard = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-black">
      <div className="w-[350px] rounded-[10px] bg-gradient-to-br from-fuchsia-700 to-fuchsia-400 text-white p-6 shadow-lg">
        <div className="text-center">
          <img
            src={zikImage}
            alt="Zik"
            className="w-[100px] h-[100px] rounded-full mx-auto"
          />
          <h3 className="mt-4 text-xl font-semibold">ZIK</h3>
          <span className="block mt-1 text-sm text-white">Dev tools</span>

          <hr className="my-4 border-white" />

          <small className="block mt-2 text-sm text-white">
            I am someone who is currently learning about programming and I sincerely hope to receive your support and guidance.
          </small>

          <div className="flex justify-center gap-3 mt-6 flex-wrap">
            <a href="https://facebook.com/tqy3p45rh2" target="_blank" rel="noopener noreferrer">
              <button className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-700 to-fuchsia-400 shadow-inner text-white">
                <i className="fa fa-facebook"></i>
              </button>
            </a>
            <a href="https://www.linkedin.com/in/de-zik-b02760341/" target="_blank" rel="noopener noreferrer">
              <button className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-700 to-fuchsia-400 shadow-inner text-white">
                <i className="fa fa-linkedin"></i>
              </button>
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=zikdev2112@gmail.com" target="_blank" rel="noopener noreferrer">
              <button className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-700 to-fuchsia-400 shadow-inner text-white">
                <i className="fa fa-google"></i>
              </button>
            </a>
            <a href="https://github.com/zikdev-vn" target="_blank" rel="noopener noreferrer">
              <button className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-700 to-fuchsia-400 shadow-inner text-white">
                <i className="fa fa-github"></i>
              </button>
            </a>
            <a href="https://x.com/@0xZik_Forever" target="_blank" rel="noopener noreferrer">
              <button className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-700 to-fuchsia-400 shadow-inner text-white">
                <i className="fa fa-twitter"></i>
              </button>
            </a>
          </div>

          <div className="mt-6">
            <button className="px-6 py-2 text-white rounded-full bg-fuchsia-500 shadow-lg hover:bg-fuchsia-600 transition">
              View profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
