import React from 'react';
import {
  FaFacebook,
  FaLinkedin,
  FaGoogle,
  FaGithub,
  FaTwitter,
} from 'react-icons/fa';

import {useRef} from 'react';
import LaserFlow from '../../components/Common/layerflow';

import AnimatedContent from '../../components/Common/AnimatedContent';
import FadeContent from '../../components/Common/FadeContent';

import zikVideo from '../../assets/images/anime-girl-face-portrait-moewalls-com.mp4';

const SocialButton = ({ href, children, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-700 to-fuchsia-400 shadow-inner text-white hover:scale-110 transition duration-300 transform"
  >
    {children}
  </a>
);

const ProfileCard = () => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 🔮 Background LaserFlow */}
      <div className="absolute inset-0 -z-10">
        <LaserFlow 
          color="#FF79C6" 
          style={{ backgroundColor: '#060010' }}
  horizontalSizing={0.75}
  verticalSizing={5}
  wispDensity={1.3}
  wispSpeed={7.5}
  wispIntensity={5.4}
  flowSpeed={0.45}
  flowStrength={0.44}
  fogIntensity={0.41}
  fogScale={0.42}
  fogFallSpeed={1.15}
  decay={2.56}
  falloffStart={0.77}
  verticalBeamOffset={0.3}
  horizontalBeamOffset={0}
          height="100%"
          width="100%"
        />
      </div>

      {/* Card */}
      <div className="w-full max-w-[350px] rounded-[10px] bg-gradient-to-br from-fuchsia-700 to-fuchsia-400 text-white p-6 shadow-xl overflow-hidden transform transition duration-500 hover:scale-[1.02] relative z-10">
        <div className="text-center">
          <FadeContent blur delay={0.7} duration={1000} easing="ease-out" initialOpacity={0}>
            <video
              src={zikVideo}
              className="w-[100px] h-[100px] rounded-full mx-auto object-cover border-4 border-fuchsia-300 shadow-md"
              autoPlay
              loop
              muted
              playsInline
            />
          </FadeContent>

          <h3 className="mt-4 text-2xl font-bold">ZIK</h3>
          <span className="block mt-1 text-sm opacity-90">Dev tools | Web Developer</span>

          <hr className="my-4 border-t border-fuchsia-300 opacity-70" />

          <p className="text-sm leading-relaxed">
            I am a passionate aspiring developer, eager to learn and grow. I sincerely appreciate your support and guidance on this journey.
          </p>

          <AnimatedContent
            distance={150}
            direction="vertical"
            duration={2.2}
            ease="power3.out"
            initialOpacity={0.2}
            animateOpacity
            scale={1.1}
            threshold={0.2}
            delay={0.7}
          >
            <div className="flex justify-center gap-4 mt-6 flex-wrap">
              <SocialButton href="https://facebook.com/tqy3p45rh2" label="Facebook"><FaFacebook className="text-lg" /></SocialButton>
              <SocialButton href="https://www.linkedin.com/in/de-zik-b02760341/" label="LinkedIn"><FaLinkedin className="text-lg" /></SocialButton>
              <SocialButton href="mailto:zikdev2112@gmail.com" label="Email"><FaGoogle className="text-lg" /></SocialButton>
              <SocialButton href="https://github.com/zikdev-vn" label="GitHub"><FaGithub className="text-lg" /></SocialButton>
              <SocialButton href="https://x.com/@0xZik_Forever" label="Twitter"><FaTwitter className="text-lg" /></SocialButton>
            </div>
          </AnimatedContent>

          <div className="mt-7">
            <button
              onClick={() => window.open('https://www.linkedin.com/in/de-zik-b02760341/', '_blank')}
              className="px-8 py-3 text-white rounded-full bg-fuchsia-500 shadow-lg hover:bg-fuchsia-600 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-fuchsia-300 focus:ring-opacity-75"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



function LaserFlowBoxExample() {
  const revealImgRef = useRef(null);

  return (
    <div 
      style={{ 
        height: '800px', 
        position: 'relative', 
        overflow: 'hidden',
        backgroundColor: '#060010'
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const el = revealImgRef.current;
        if (el) {
          el.style.setProperty('--mx', `${x}px`);
          el.style.setProperty('--my', `${y + rect.height * 0.5}px`);
        }
      }}
      onMouseLeave={() => {
        const el = revealImgRef.current;
        if (el) {
          el.style.setProperty('--mx', '-9999px');
          el.style.setProperty('--my', '-9999px');
        }
      }}
    >
      <LaserFlow
        horizontalBeamOffset={0.1}
        verticalBeamOffset={0.0}
        color="#FF79C6"
      />
      
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '86%',
        height: '60%',
        backgroundColor: '#060010',
        borderRadius: '20px',
        border: '2px solid #FF79C6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '2rem',
        zIndex: 6
      }}>
        {/* Your content here */}
      </div>

      <img
        ref={revealImgRef}
        src="/path/to/image.jpg"
        alt="Reveal effect"
        style={{
          position: 'absolute',
          width: '100%',
          top: '-50%',
          zIndex: 5,
          mixBlendMode: 'lighten',
          opacity: 0.3,
          pointerEvents: 'none',
          '--mx': '-9999px',
          '--my': '-9999px',
          WebkitMaskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
          maskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat'
        }}
      />
    </div>
  );
}

export default ProfileCard;
