// src/animations/useGsapAnimations.js
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
gsap.registerPlugin(useGSAP);
/**
 * Hook hiệu ứng fade lên khi component mount
 * targetSelector: CSS selector (string)
 */
export const useFadeUpOnMount = (targetSelector) => {
  useGSAP(() => {
    gsap.from(targetSelector, {
      opacity: 0,
      y: 40,
      duration: 1.5,
      stagger: 0.7,
      delay: 0.5,
      ease: "power3.out",
    });
  }, []);
};

/**
 * Hook slide from left
 */
export const useSlideFromLeft = (targetSelector) => {
  useGSAP(() => {
    gsap.from(targetSelector, {
      opacity: 0,
      x: -100,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);
};

/**
 * Hook blur scale in
 */
export const useBlurScaleIn = (targetSelector) => {
  useGSAP(() => {
    gsap.from(targetSelector, {
      opacity: 0,
      filter: "blur(10px)",
      scale: 1.2,
      duration: 1.5,
      delay: 0.5,
      ease: "power3.out",
    });
  }, []);
};
