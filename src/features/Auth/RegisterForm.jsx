import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { register } from '../../services/auth/auth';

const RegisterForm = ({ onSwitch }) => {
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [id]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => ({ ...prev, [id]: '' })); // Clear error when typing
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Name is required.';
    if (!form.username) newErrors.username = 'Username is required.';
    if (!form.email) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid.';
    if (!form.password) newErrors.password = 'Password is required.';
    if (form.password !== form.repeatPassword) newErrors.repeatPassword = 'Passwords do not match.';
    if (!form.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms.';
    return newErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const res = await register(form.name, form.email, form.password, form.username);
    if (res.ok) {
      alert('Đăng ký thành công!');
      onSwitch();
    } else {
      alert('Đăng ký thất bại!');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="text-center mb-4">
        <p className="text-gray-700">Sign up with:</p>
        <button type="button" className="text-xl text-red-500 hover:text-red-600"><FaGoogle /></button>
      </div>
      <p className="text-center text-sm text-gray-500 mb-4">or:</p>

      <div className="mb-3">
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div className="mb-3">
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
      </div>

      <div className="mb-3">
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div className="mb-3">
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>

      <div className="mb-3">
        <input
          id="repeatPassword"
          type="password"
          placeholder="Repeat Password"
          value={form.repeatPassword}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        {errors.repeatPassword && <p className="text-red-500 text-sm mt-1">{errors.repeatPassword}</p>}
      </div>

      <div className="flex items-center mb-4">
        <input
          id="agreeTerms"
          type="checkbox"
          checked={form.agreeTerms}
          onChange={handleChange}
          className="mr-2"
        />
        <label htmlFor="agreeTerms" className="text-sm text-gray-600">
          I agree to the terms
        </label>
      </div>
      {errors.agreeTerms && <p className="text-red-500 text-sm mb-3">{errors.agreeTerms}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
      >
        Sign up
      </button>

      <button
        type="button"
        onClick={onSwitch}
        className="w-full mt-3 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
      >
        Already have an account? Sign in
      </button>
    </form>
  );
};

export default RegisterForm;
