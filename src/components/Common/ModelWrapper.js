import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ModalWrapper = ({ onClose, children }) => {
  const modalRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      modalRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4 }
    );
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-gray-500 hover:text-red-600"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
