import React, { useEffect, useRef, useState } from 'react';
import { Mail, Shield, Zap, Clock, Check, ArrowRight, Code, Globe, Users, User, Settings, Upload, Save, Eye, EyeOff, Bell, Lock, Trash2, FileText } from 'lucide-react';

const TempMailAPI = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const pricingRef = useRef(null);
  const statsRef = useRef(null);
  
  // State management
  const [currentView, setCurrentView] = useState('home');
  const [showPassword, setShowPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Nguyễn Văn A',
    username: 'nguyenvana',
    email: 'nguyenvana@gmail.com',
    avatar: null
  });
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: false,
    apiKeyVisible: false,
    autoDelete: true,
    language: 'vi'
  });

  useEffect(() => {
    // Simple animations without GSAP since it's not available
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    });

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.6s ease-out';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleProfileUpdate = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSettingsUpdate = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({ ...prev, avatar: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const plans = [
    {
      name: '1 Ngày',
      price: '29,000',
      period: 'VND',
      duration: '24 giờ',
      requests: '1,000',
      popular: false,
      features: ['1,000 API calls', 'Hỗ trợ email cơ bản', 'Tài liệu API', 'Support 24/7']
    },
    {
      name: '7 Ngày',
      price: '149,000',
      period: 'VND',
      duration: '1 tuần',
      requests: '10,000',
      popular: true,
      features: ['10,000 API calls', 'Email tùy chỉnh domain', 'Webhooks', 'Priority support', 'Email forwarding']
    },
    {
      name: '30 Ngày',
      price: '499,000',
      period: 'VND',
      duration: '1 tháng',
      requests: '50,000',
      popular: false,
      features: ['50,000 API calls', 'Unlimited domains', 'Advanced webhooks', 'Dedicated support', 'Custom integrations', 'Analytics dashboard']
    }
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Siêu Nhanh',
      description: 'Tạo email tạm thời trong vòng chưa đến 1 giây'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Bảo Mật Cao',
      description: 'Mã hóa end-to-end và tự động xóa sau thời hạn'
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'RESTful API',
      description: 'API đơn giản, dễ tích hợp với mọi ngôn ngữ lập trình'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Multi-Domain',
      description: 'Hỗ trợ nhiều domain khác nhau cho email tạm'
    }
  ];

  const renderNavigation = () => (
    <nav className="relative z-10 p-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentView('home')}>
          <Mail className="w-8 h-8 text-purple-400" />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            TempMail API
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setCurrentView('profile')}
            className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full hover:bg-white/20 transition-colors flex items-center space-x-2"
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </button>
          <button 
            onClick={() => setCurrentView('settings')}
            className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full hover:bg-white/20 transition-colors flex items-center space-x-2"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </nav>
  );

  const renderProfilePage = () => (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Chỉnh Sửa Profile
          </h2>
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center overflow-hidden">
                {profileData.avatar ? (
                  <img src={profileData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-16 h-16 text-white" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-purple-500 rounded-full p-2 cursor-pointer hover:bg-purple-600 transition-colors">
                <Upload className="w-4 h-4" />
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  className="hidden" 
                />
              </label>
            </div>
            <p className="text-gray-300 mt-2">Nhấn để thay đổi ảnh đại diện</p>
          </div>

          {/* Profile Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Họ và Tên</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => handleProfileUpdate('name', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
                placeholder="Nhập họ và tên"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                value={profileData.username}
                onChange={(e) => handleProfileUpdate('username', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
                placeholder="Nhập username"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => handleProfileUpdate('email', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
                placeholder="Nhập email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Mật khẩu mới</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
                  placeholder="Nhập mật khẩu mới"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Giới thiệu</label>
            <textarea
              rows="4"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none resize-none"
              placeholder="Viết vài dòng giới thiệu về bản thân..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all flex items-center justify-center space-x-2">
              <Save className="w-5 h-5" />
              <span>Lưu Thay Đổi</span>
            </button>
            <button 
              onClick={() => setCurrentView('home')}
              className="border border-white/30 px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettingsPage = () => (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Cài Đặt
          </h2>

          {/* API Settings */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Code className="w-5 h-5" />
              <span>API Settings</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                <div>
                  <div className="font-medium">API Key</div>
                  <div className="text-sm text-gray-400">
                    {settings.apiKeyVisible ? 'sk-1234567890abcdef...' : '••••••••••••••••••••'}
                  </div>
                </div>
                <button
                  onClick={() => handleSettingsUpdate('apiKeyVisible', !settings.apiKeyVisible)}
                  className="text-purple-400 hover:text-purple-300"
                >
                  {settings.apiKeyVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                <div>
                  <div className="font-medium">Tự động xóa email</div>
                  <div className="text-sm text-gray-400">Email sẽ tự động xóa sau thời hạn</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoDelete}
                    onChange={(e) => handleSettingsUpdate('autoDelete', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Thông Báo</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                <div>
                  <div className="font-medium">Thông báo push</div>
                  <div className="text-sm text-gray-400">Nhận thông báo trên trình duyệt</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) => handleSettingsUpdate('notifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                <div>
                  <div className="font-medium">Email alerts</div>
                  <div className="text-sm text-gray-400">Nhận cảnh báo qua email</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailAlerts}
                    onChange={(e) => handleSettingsUpdate('emailAlerts', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Language Settings */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Ngôn Ngữ</span>
            </h3>
            <select
              value={settings.language}
              onChange={(e) => handleSettingsUpdate('language', e.target.value)}
              className="w-full md:w-auto bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-purple-400 focus:outline-none"
            >
              <option value="vi" className="bg-gray-800">Tiếng Việt</option>
              <option value="en" className="bg-gray-800">English</option>
              <option value="zh" className="bg-gray-800">中文</option>
            </select>
          </div>

          {/* Security Settings */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Lock className="w-5 h-5" />
              <span>Bảo Mật</span>
            </h3>
            <div className="space-y-4">
              <button className="w-full md:w-auto bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded-lg font-semibold transition-colors">
                Đổi Mật Khẩu
              </button>
              <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors ml-0 md:ml-4">
                Kích Hoạt 2FA
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2 text-red-400">
              <Trash2 className="w-5 h-5" />
              <span>Vùng Nguy Hiểm</span>
            </h3>
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-gray-300 mb-4">
                Xóa tài khoản sẽ không thể khôi phục. Tất cả dữ liệu và API key sẽ bị xóa vĩnh viễn.
              </p>
              <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition-colors">
                Xóa Tài Khoản
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all flex items-center justify-center space-x-2">
              <Save className="w-5 h-5" />
              <span>Lưu Cài Đặt</span>
            </button>
            <button 
              onClick={() => setCurrentView('home')}
              className="border border-white/30 px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Quay Lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHomePage = () => (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center animate-on-scroll">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            TempMail API
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
            API tạo email tạm thời mạnh mẽ nhất Việt Nam. Tích hợp dễ dàng, bảo mật tuyệt đối.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105 flex items-center space-x-2">
              <span>Bắt Đầu Ngay</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border border-white/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-colors">
              Xem Demo
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto animate-on-scroll">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-4xl font-bold text-purple-400 mb-2">1M+</div>
              <div className="text-gray-300">API Calls/Tháng</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-4xl font-bold text-blue-400 mb-2">99.9%</div>
              <div className="text-gray-300">Uptime</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-4xl font-bold text-indigo-400 mb-2">500ms</div>
              <div className="text-gray-300">Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Tính Năng Nổi Bật
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="text-purple-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Gói Dịch Vụ
          </h2>
          <p className="text-center text-gray-300 mb-16 text-xl">
            Chọn gói phù hợp với nhu cầu của bạn
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border transition-all transform hover:scale-105 ${
                  plan.popular 
                    ? 'border-purple-400 bg-gradient-to-br from-purple-500/20 to-blue-500/20' 
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Phổ Biến Nhất
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold mb-2">
                    {plan.price} <span className="text-lg font-normal text-gray-400">{plan.period}</span>
                  </div>
                  <p className="text-gray-400">{plan.requests} requests</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-4 rounded-full font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white'
                    : 'border border-white/30 hover:bg-white/10 text-white'
                }`}>
                  Chọn Gói {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};