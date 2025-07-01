import React from 'react';
import {
  FaFacebook,
  FaLinkedin,
  FaGoogle,
  FaGithub,
  FaTwitter,
} from 'react-icons/fa';


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
    <div className="h-screen w-full flex items-center justify-center bg-black p-4">
      <div
        className="w-full max-w-[350px] rounded-[10px] bg-gradient-to-br from-fuchsia-700 to-fuchsia-400 text-white p-6 shadow-xl overflow-hidden transform transition duration-500 hover:scale-[1.02]"
      >
        <div className="text-center">
            <FadeContent
             blur={true}
             delay={0.7}
              duration={1000}
               easing="ease-out"
                initialOpacity={0}
                >
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
  reverse={false}
  duration={2.2}
  ease="power3.out"
  initialOpacity={0.2}
  animateOpacity
  scale={1.1}
  threshold={0.2}
  delay={0.7}
>
          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <SocialButton href="https://facebook.com/tqy3p45rh2" label="Facebook">
              <FaFacebook className="text-lg" />
            </SocialButton>
            <SocialButton href="https://www.linkedin.com/in/de-zik-b02760341/" label="LinkedIn">
              <FaLinkedin className="text-lg" />
            </SocialButton>
            <SocialButton href="mailto:zikdev2112@gmail.com" label="Email">
              <FaGoogle className="text-lg" />
            </SocialButton>
            <SocialButton href="https://github.com/zikdev-vn" label="GitHub">
              <FaGithub className="text-lg" />
            </SocialButton>
            <SocialButton href="https://x.com/@0xZik_Forever" label="Twitter">
              <FaTwitter className="text-lg" />
            </SocialButton>
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

export default ProfileCard;
