// src/components/ui/TrashIcon.js
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import Lottie from 'lottie-react';
import trashAnimation from './json/trash.json';

const TrashIcon = ({ onClick, width = 32, height = 32 }) => {
    //const [animationSupported, setAnimationSupported] = useState(true);
    const lottieRef = useRef();
  

  
    const handleHoverIn = () => {
      lottieRef.current.setDirection(1);
      lottieRef.current.play();
    };
  
    const handleHoverOut = () => {
      lottieRef.current.setDirection(-1);
      lottieRef.current.play();
    };
  
    return (
      <div
        onMouseEnter={handleHoverIn}
        onMouseLeave={handleHoverOut}
        style={{ width, height, cursor: 'pointer' }}
      >
        
          <Lottie
            animationData={trashAnimation}
            loop={false}
            autoplay={false}
            style={{ width, height }}
            lottieRef={lottieRef}
            onClick={onClick}
          />
        
      
      </div>
    );
  };
  

export default TrashIcon;
