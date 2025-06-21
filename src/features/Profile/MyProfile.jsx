import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MyProfile = ({ user }) => {
  const cardRef = useRef();

  useEffect(() => {
    gsap.fromTo(cardRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
  }, []);

  if (!user) {
    return <div>Người dùng chưa đăng nhập hoặc chưa có dữ liệu.</div>;
  }

  return (
    <div ref={cardRef} className="p-4 bg-white rounded shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Thông tin cá nhân</h2>
      
      {/* Ảnh đại diện nếu có, nếu không hiện avatar mặc định hoặc chữ */}
      {user.avatar ? (
        <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full mb-4" />
      ) : (
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-4 text-gray-600">
          Chưa cập nhật avatar
        </div>
      )}

      <p><strong>Họ tên:</strong> {user.name || "Chưa cập nhật tên"}</p>
      <p><strong>Email:</strong> {user.email || "Chưa cập nhật email"}</p>
      
      {/* Nếu còn trường khác cũng tương tự */}
    </div>
  );
};

export default MyProfile;
