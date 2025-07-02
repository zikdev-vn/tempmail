import React, { useState, useEffect } from 'react';
import { login, whoami, googleLogin } from '../../services/auth/auth';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { GoogleLogin } from '@react-oauth/google';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const LoginForm = ({ onSuccess, onSwitch }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  
  // Sử dụng hook để quản lý user data
  const [user, setUser] = useLocalStorage('user', null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  // Cleanup invalid localStorage data khi component mount
  useEffect(() => {
    try {
      // Chỉ cleanup nếu hook trả về invalid data
      if (user === undefined || user === null || user === '') {
        setUser(null); // Sử dụng hook thay vì localStorage trực tiếp
      }
    } catch (error) {
      console.warn('localStorage cleanup error:', error);
      setUser(null);
    }
  }, []); // Chỉ chạy 1 lần khi mount

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      //console.log(' Google token decoded:', decoded);

      const result = await googleLogin(credentialResponse.credential);
      //console.log(' Google login result:', result);

      if (result.success) {
        const userToStore = {
          ...result.user,
          picture: decoded.picture,
          loginTime: new Date().toISOString(),
          loginMethod: 'google'
        };

        // Clear previous user data trước khi lưu mới
        setUser(null);
        setUser(userToStore);
        
        onSuccess?.(userToStore);
        alert(' Đăng nhập bằng Google thành công!');
      } else {
        alert(` ${result.error || 'Đăng nhập Google thất bại'}`);
      }
    } catch (error) {
      //console.error('❌ Google login failed:', error);
      alert(' Đăng nhập Google thất bại!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = (error) => {
    console.error('Google login error:', error);
    alert(' Đăng nhập Google thất bại!');
    setIsLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Clear previous user data trước khi đăng nhập
      setUser(null);
      
      const res = await login(form.email, form.password);
      
      if (res.ok) {
        const token = res.data.access_token;
        
        // Lưu cookies
        Cookies.set('access_token', token, { expires: 7 });
        Cookies.set('last_login_ip', res.data.last_login_ip, { expires: 7 });
        Cookies.set('last_login_time', res.data.last_login_time, { expires: 7 });

        const userRes = await whoami(token);
        
        if (userRes.ok) {
          const userToStore = {
            ...userRes.data,
            loginTime: new Date().toISOString(),
            loginMethod: 'email'
          };

          // Lưu dữ liệu người dùng mới
          setUser(userToStore);

          onSuccess?.(userToStore);
          alert(' Đăng nhập thành công!');
        } else {
          alert(' Không thể lấy thông tin người dùng!');
        }
      } else {
        alert(' Email hoặc mật khẩu không đúng!');
      }
    } catch (error) {
      console.error(' Login error:', error);
      alert(' Có lỗi xảy ra khi đăng nhập!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="w-full max-w-sm mx-auto p-4 bg-white shadow-md rounded-md">
      <div className="text-center mb-4">
        <p className="text-gray-700 mb-2">Sign in with:</p>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="outline"
            size="large"
            text="signin_with"
            shape="rectangular"
            width="300"
            disabled={isLoading}
          />
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 my-4">or sign in with your email:</p>

      <input
        id="email"
        type="text"
        placeholder="Email or Username"
        value={form.email}
        onChange={handleChange}
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        disabled={isLoading}
      />
      
      <input
        id="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        disabled={isLoading}
      />
      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? 'Đang đăng nhập...' : 'Sign in'}
      </button>

      <p className="text-center mt-4 text-sm text-gray-600">
        Not a member?{' '}
        <button 
          onClick={onSwitch} 
          type="button" 
          className="text-blue-600 hover:underline disabled:opacity-50"
          disabled={isLoading}
        >
          Register
        </button>
      </p>

      {/* Debug info - xóa trong production 
      {process.env.NODE_ENV === 'development' && user && (
        <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
          <p>Debug: User data loaded successfully</p>
          <p>Login method: {user.loginMethod}</p>
          <p>Login time: {user.loginTime}</p>
        </div>
      )} */}
    </form>
  );
};

export default LoginForm;