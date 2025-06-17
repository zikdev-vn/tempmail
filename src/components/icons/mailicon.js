import React , { useRef } from "react";
import Lottie from "lottie-react";
import mailAnimation from "./json/mail.json";

const Mailicon = () => {
    const lottieRef = useRef();
    const handleMouseEnter = () => {
        lottieRef.current.setDirection(1); // chạy tới
        lottieRef.current.play();
      };
    
      const handleMouseLeave = () => {
        lottieRef.current.setDirection(-1); // chạy ngược
        lottieRef.current.play();
      };
    return (
        <div
      style={{ width: "34px", height: "32px", cursor: "pointer"}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={mailAnimation}
        loop={false}
        autoplay={false}
      />
    </div>
    );
  };
  
  export default Mailicon;