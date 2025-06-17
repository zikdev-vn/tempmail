import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export default function SlideFromLeft({ children, className = "", tag = "div" }) {
  const containerRef = useRef();
  const Tag = tag;

  useEffect(() => {
    if (!containerRef.current) return;

    // Chọn tất cả con trực tiếp bên trong container để animate
    const targets = containerRef.current.children;

    gsap.from(targets, {
      opacity: 0,
      x: -100,
      duration: 0.8,
      ease: "power2.out",
      delay: 0,
      //stagger: 0.1, cho tat cac phan tu di chuyen lan luot
    });
  }, []);

  return (
    <Tag ref={containerRef} className={className}>
      {children}
    </Tag>
  );
}
