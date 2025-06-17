import React, { useState } from "react";

const Button = ({ onClick, children }) => {
  const [hover, setHover] = useState(false);

  const normalShadow = {
    boxShadow: `
      5px 5px 0 black,
      -5px -5px 0 black,
      -5px 5px 0 black,
      5px -5px 0 black`,
    transition: "box-shadow 500ms ease-in-out",
  };

  const hoverShadow = {
    boxShadow: `
      20px 5px 0 black,
      -20px -5px 0 black`,
    transition: "box-shadow 500ms ease-in-out",
  };

  return (
    <button
      className="w-[150px] h-[50px] cursor-pointer text-[20px] font-bold text-black bg-white border-2 border-black select-none focus:outline-none"
      style={hover ? hoverShadow : normalShadow}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
