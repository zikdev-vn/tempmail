import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { login, whoami, googleLogin } from '../../services/auth/auth';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from '@react-oauth/google';
const LoginForm = ({ onSuccess, onSwitch }) => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };
const handleGoogleSuccess = async (credentialResponse) => {
  const decoded = jwtDecode(credentialResponse.credential);
  console.log("Thông tin người dùng Google (token đã giải mã):", decoded);

  const result = await googleLogin(credentialResponse.credential);
  console.log("Kết quả đăng nhập Google từ API:", result);

  if (result.success) {
    alert("✅ Đăng nhập bằng Google thành công!");
    // Lưu dữ liệu người dùng (result.user) vào localStorage hoặc trạng thái toàn cục của bạn
    localStorage.setItem('user', JSON.stringify(result.user));
    const userToStore = {
      ...result.user, // Bao gồm access_token, id, name, email từ API backend
      picture: decoded.picture // Thêm URL ảnh từ token Google
    };
    handleLoginSuccess(userToStore);
    //window.location.reload(); // Tải lại trang để cập nhật trạng thái xác thực (hoặc cập nhật trạng thái trực tiếp)
  } else {
    // result.error bây giờ sẽ chứa thông báo lỗi cụ thể
    alert(`❌ ${result.error}`);
  }
};

  const handleGoogleError = () => {
    alert("❌ Đăng nhập Google thất bại!");
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login(form.email, form.password);
    if (res.ok) {
      const token = res.data.access_token;
      Cookies.set('access_token', token, { expires: 7 });
      Cookies.set('last_login_ip', res.data.last_login_ip, { expires: 7 });
      Cookies.set('last_login_time', res.data.last_login_time, { expires: 7 });

      const userRes = await whoami(token);
      if (userRes.ok) {
        localStorage.setItem('user', JSON.stringify(userRes.data));
      }

      onSuccess?.();
    } else {
      alert('Đăng nhập thất bại!');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="text-center mb-4">
        <p className="text-gray-700">Sign in with:</p>
        <button type="button" className="text-xl text-red-500 hover:text-red-600"><GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          theme="outline"
          size="large"
          text="signin_with"
          shape="rectangular"
          width="300"
        /></button>
      </div>

      <p className="text-center text-sm text-gray-500 mb-4">or:</p>

      <input
        id="email"
        
        placeholder="Email or Username"
        value={form.email}
        onChange={handleChange}
        className="w-full p-3 mb-4 border border-gray-300 rounded-md"
      />
      <input
        id="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full p-3 mb-4 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
      >
        Sign in
      </button>
      <p className="text-center mt-4 text-sm text-gray-600">
        Not a member?{" "}
        <button onClick={onSwitch} type="button" className="text-blue-600 hover:underline">
          Register
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
