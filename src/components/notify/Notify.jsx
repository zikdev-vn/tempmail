import React from 'react';
import './Notify.css'; // nếu bạn có animation custom thì dùng CSS riêng

const StatusBox = ({ type = 'success', message, subMessage, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-40 z-50 font-sans uppercase text-center">
      <div id="container" className="relative w-[350px] h-[180px]">
        {type === 'success' && (
          <div id="success-box" className="absolute left-[12%] w-[35%] h-full rounded-[20px] bg-gradient-to-br from-lime-300 to-green-300 shadow-lg">
            <div className="dot w-2 h-2 bg-white rounded-full absolute top-[4%] right-[6%] hover:bg-gray-300"></div>
            <div className="dot two w-2 h-2 bg-white rounded-full absolute top-[4%] right-[12%] opacity-50 hover:bg-gray-300"></div>
            <div className="face w-[22%] h-[22%] bg-white rounded-full border border-gray-600 absolute top-[21%] left-[37.5%] animate-bounce z-10">
              <div className="eye w-[5px] h-[5px] bg-gray-600 rounded-full absolute top-[40%] left-[20%]"></div>
              <div className="eye w-[5px] h-[5px] bg-gray-600 rounded-full absolute top-[40%] left-[68%]"></div>
              <div className="mouth happy absolute top-[43%] left-[41%] w-[7px] h-[7px] rounded-full border-2 border-transparent border-r-gray-600 border-b-gray-600 rotate-45"></div>
            </div>
            <div className="shadow absolute w-[21%] h-[3%] bg-gray-600 opacity-50 left-[40%] top-[43%] rounded-full animate-pulse z-0"></div>
            <div className="message absolute w-full top-[47%] h-[40%]">
              <h1 className="alert font-bold text-[0.9em] tracking-[5px] text-white">Success!</h1>
              <p className="mt-[-5px] text-xs font-light text-gray-600 tracking-wide lowercase">{message || 'Yay, everything is working.'}</p>
            </div>
            <button
              className="button-box absolute top-[73%] left-[25%] w-1/2 h-[15%] rounded-[20px] bg-white shadow-md transition duration-300 hover:bg-gray-100 hover:scale-105"
              onClick={onClose}
            >
              <h1 className="text-green-700 font-bold">{subMessage || 'Continue'}</h1>
            </button>
          </div>
        )}

        {type === 'error' && (
          <div id="error-box" className="absolute right-[12%] w-[35%] h-full rounded-[20px] bg-gradient-to-bl from-pink-300 to-orange-300 shadow-lg">
            <div className="dot w-2 h-2 bg-white rounded-full absolute top-[4%] right-[6%] hover:bg-gray-300"></div>
            <div className="dot two w-2 h-2 bg-white rounded-full absolute top-[4%] right-[12%] opacity-50 hover:bg-gray-300"></div>
            <div className="face2 w-[22%] h-[22%] bg-white rounded-full border border-gray-600 absolute top-[21%] left-[37.5%] animate-[roll_3s_ease-in-out_infinite] z-10">
              <div className="eye w-[5px] h-[5px] bg-gray-600 rounded-full absolute top-[40%] left-[20%]"></div>
              <div className="eye w-[5px] h-[5px] bg-gray-600 rounded-full absolute top-[40%] left-[68%]"></div>
              <div className="mouth sad absolute top-[49%] left-[41%] w-[7px] h-[7px] rounded-full border-2 border-t-gray-600 border-l-gray-600 border-transparent rotate-45"></div>
            </div>
            <div className="shadow absolute w-[21%] h-[3%] bg-gray-600 opacity-50 top-[43%] rounded-full animate-[move_3s_ease-in-out_infinite]"></div>
            <div className="message absolute w-full top-[47%] h-[40%]">
              <h1 className="alert font-bold text-[0.9em] tracking-[5px] text-white">Error!</h1>
              <p className="mt-[-5px] text-xs font-light text-gray-700 tracking-wide lowercase">{message || 'Oh no, something went wrong.'}</p>
            </div>
            <button
              className="button-box absolute top-[73%] left-[25%] w-1/2 h-[15%] rounded-[20px] bg-white shadow-md transition duration-300 hover:bg-gray-100 hover:scale-105"
              onClick={onClose}
            >
              <h1 className="text-red-600 font-bold">{subMessage || 'Try again'}</h1>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusBox;
