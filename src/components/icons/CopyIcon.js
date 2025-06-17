import React ,{useRef} from 'react';
import Lottie from 'lottie-react';
import copyAnimation from './json/copy.json';

const CopyIcon = ({ onClick, size = 32 }) => {
    const lottieRef = useRef();

  const handleMouseEnter = () => {
    lottieRef.current.setDirection(1); // forward
    lottieRef.current.play();
  };

  const handleMouseLeave = () => {
    lottieRef.current.setDirection(-1); // reverse
    lottieRef.current.play();
  };
  return (
    <div style={{ width: size, height: size }}
    onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Lottie        
      lottieRef={lottieRef}
        animationData={copyAnimation}
        loop={false}
        autoplay={false}
        onClick={onClick}
        />
    </div>
  );
};

export default CopyIcon;
