import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "./json/loadingV2.json";

const LoadingV2 = ({ size = 32 }) => {
    const lottieRef = React.useRef();
    React.useEffect(() => {
        if (lottieRef.current) {
            lottieRef.current.play();
        }
    }
, []);
  return (
    <div style={{ width: size, height: size }}>
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        autoplay={true}
        style={{ color: "white", width: "23px", height: "23px" }}
      />
    </div>
  );
}
export default LoadingV2;