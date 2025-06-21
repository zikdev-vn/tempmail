import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { login, register ,whoami } from '../../services/auth/auth'; // Import your API functions here
import Cookies from 'js-cookie';
import StatusBox from '../../components/notify/Notify';

const AuthForm = ({ onSuccess }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    username: '',
    repeatPassword: '',
    agreeTerms: false,
  });

  const [statusBox, setStatusBox] = useState({
  show: false,
  type: 'success', // hoặc 'error'
  message: '',
  subMessage: '',
});

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  // Hàm xử lý đăng nhập
  const handleLogin = async (e) => {
  e.preventDefault(); // Ngăn hành vi submit mặc định của form

  const { email, password } = formData;

  try {
    // Gọi API đăng nhập
    const res = await login(email, password);

    if (res.ok) {
      const token = res.data.access_token;

      // Lưu token và thông tin đăng nhập vào cookie
      Cookies.set('access_token', token, { expires: 7, path: '/' });
      Cookies.set('last_login_ip', res.data.last_login_ip, { expires: 7, path: '/' });
      Cookies.set('last_login_time', res.data.last_login_time, { expires: 7, path: '/' });

      console.log('Đăng nhập thành công:', res.data);

      // Gọi API whoami để lấy thông tin người dùng
      const userRes = await whoami(token);
      if (userRes.ok) {
        localStorage.setItem('user', JSON.stringify(userRes.data));
        console.log('Thông tin người dùng:', userRes.data);
      } else {
        console.warn('Không lấy được thông tin người dùng:', userRes.data);
      }

      // ✅ Gọi hàm đóng modal sau khi đăng nhập thành công
      setStatusBox({
    show: true,
    type: 'success',
    message: 'Đăng nhập thành công!',
    subMessage: 'Tiếp tục',
  });
setTimeout(() => {
    setStatusBox((prev) => ({ ...prev, show: false }));
    if (typeof onSuccess === 'function') {
      onSuccess();
    }// đóng modal hoặc chuyển trang
  }, 3000);
    } else {
      console.warn('Đăng nhập thất bại:', res.data);
      setStatusBox({
    show: true,
    type: 'error',
    message: 'Đăng nhập thất bại! Kiểm tra lại email và mật khẩu.',
    subMessage: 'Thử lại',
  });
    }
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
    alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
  }
};



  // Hàm xử lý đăng ký
  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, username, email, password, repeatPassword, agreeTerms } = formData;

    // Kiểm tra mật khẩu có khớp không
    if (password !== repeatPassword) {
      console.log('Mật khẩu không khớp');
      return;
    }

    // Kiểm tra người dùng có đồng ý điều khoản không
    if (!agreeTerms) {
      console.log('Bạn phải đồng ý với điều khoản');
      return;
    }

    // Gọi API đăng ký
    const res = await register(name, email, password, username);
    if (res.ok) {
      console.log('Đăng ký thành công:', res.data);
      // Có thể chuyển hướng hoặc thông báo sau khi đăng ký thành công
    } else {
      console.log('Đăng ký thất bại:', res.data);
    }
  };

  return (
    <>        {statusBox.show && (
  <StatusBox
    type={statusBox.type}
    message={statusBox.message}
    subMessage={statusBox.subMessage}
    onClose={() => setStatusBox({ ...statusBox, show: false })}
  />
)}
    <div>
      <div className="tab-content">

        {/* Login Tab */}
        {activeTab === 'login' && (
          <div className="tab-pane fade show active" role="tabpanel">
            <form>
              <div className="text-center mb-3">
                <p>Sign in with:</p>
                <button type="button" className="text-xl mx-1">
                  <FaGoogle />
                </button>
              </div>
              <p className="text-center">or:</p>

              {/* Email input */}
              <div className="mb-4">
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label className="block mt-1 text-sm text-gray-600" htmlFor="email">Email or username</label>
              </div>

              {/* Password input */}
              <div className="mb-4">
                <input
                  type="password"
                  id="password"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={formData.password}
                  onChange={handleChange}
                />
                <label className="block mt-1 text-sm text-gray-600" htmlFor="password">Password</label>
              </div>

              {/* Submit button */}
              <button
                onClick={handleLogin}
                type="button" 
                className="w-full p-3 bg-blue-600 text-white rounded-md mb-4"
              >
                Sign in
              </button>

              {/* Register link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">Not a member? <button onClick={() => handleTabChange('register')} className="text-blue-600">Register</button></p>
              </div>
            </form>
          </div>
        )}

        {/* Register Tab */}
        {activeTab === 'register' && (
          <div className="tab-pane fade" role="tabpanel">
            <form>
              <div className="text-center mb-3">
                <p>Sign up with:</p>
                <button type="button" className="text-xl mx-1">
                  <FaGoogle />
                </button>
              </div>
              <p className="text-center">or:</p>

              {/* Name input */}
              <div className="mb-4">
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={formData.name}
                  onChange={handleChange}
                />
                <label className="block mt-1 text-sm text-gray-600" htmlFor="name">Name</label>
              </div>

              {/* Username input */}
              <div className="mb-4">
                <input
                  type="text"
                  id="username"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={formData.username}
                  onChange={handleChange}
                />
                <label className="block mt-1 text-sm text-gray-600" htmlFor="username">Username</label>
              </div>

              {/* Email input */}
              <div className="mb-4">
                <input
                  type="email"
                  id="registerEmail"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={formData.registerEmail}
                  onChange={handleChange}
                />
                <label className="block mt-1 text-sm text-gray-600" htmlFor="registerEmail">Email</label>
              </div>

              {/* Password input */}
              <div className="mb-4">
                <input
                  type="password"
                  id="registerPassword"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={formData.registerPassword}
                  onChange={handleChange}
                />
                <label className="block mt-1 text-sm text-gray-600" htmlFor="registerPassword">Password</label>
              </div>

              {/* Repeat Password input */}
              <div className="mb-4">
                <input
                  type="password"
                  id="repeatPassword"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={formData.repeatPassword}
                  onChange={handleChange}
                />
                <label className="block mt-1 text-sm text-gray-600" htmlFor="repeatPassword">Repeat password</label>
              </div>

              {/* Checkbox */}
              <div className="flex items-center justify-center mb-4">
                <input
                  className="mr-2"
                  type="checkbox"
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                />
                <label htmlFor="agreeTerms" className="text-sm text-gray-600">
                  I have read and agree to the terms
                </label>
              </div>

              {/* Submit button */}
              <button
                onClick={handleRegister}
                type="button" 
                className="w-full p-3 bg-blue-600 text-white rounded-md mb-3"
              >
                Sign up
              </button>

              <button type="button" className="w-full p-3 bg-gray-200 text-gray-700 rounded-md mb-3" onClick={() => handleTabChange('login')}>Already a member? Log In</button>
            </form>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default AuthForm;
