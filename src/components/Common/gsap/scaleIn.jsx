import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export default function ScaleIn({ children, className = "", tag = "div" }) {
  const containerRef = useRef();
  const Tag = tag;

  useEffect(() => {
    if (!containerRef.current) return;

    // Chọn tất cả con trực tiếp bên trong container để animate
    const targets = containerRef.current.children;

    gsap.from(target, {
    opacity: 0,
    scale: 0.9,
    duration: 0.6,
    ease: "back.out(1.7)",
    delay,
    //stagger: 0.1,  neu muon tung phan tu con chay lan luot

  });
  }, []);

  return (
    <Tag ref={containerRef} className={className}>
      {children}
    </Tag>
  );
}
