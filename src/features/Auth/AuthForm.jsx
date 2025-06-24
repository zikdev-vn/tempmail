import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthForm = ({ onSuccess }) => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
      {activeTab === 'login' ? (
        <LoginForm onSuccess={onSuccess} onSwitch={() => setActiveTab('register')} />
      ) : (
        <RegisterForm onSwitch={() => setActiveTab('login')} />
      )}
    </div>
  );
};

export default AuthForm;
