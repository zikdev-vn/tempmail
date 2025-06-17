import React, { useRef } from 'react';
import Lottie from 'lottie-react';
import arrowUp from './json/arrowUp.json';

const ArrowUpOn = ({ onClick , size = 32 }) => {
  const lottieRef = useRef();

//  const handleMouseEnter = () => {
//    if (lottieRef.current) {
//      lottieRef.current.setDirection(1);
//      lottieRef.current.play();
//    }
//  };

//  const handleMouseLeave = () => {
//    if (lottieRef.current) {
//      lottieRef.current.setDirection(-1);
//      lottieRef.current.play();
//    }
//  };

  return (
    <div
      style={{ width: size, height: size, cursor: 'pointer' }}
      //onMouseEnter={handleMouseEnter}
      //onMouseLeave={handleMouseLeave}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={arrowUp}
        loop={true}
        autoplay={true}
        onClick={onClick}
      />
    </div>
  );
};

export default ArrowUpOn;
