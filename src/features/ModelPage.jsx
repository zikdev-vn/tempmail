import React, { useEffect, useRef } from 'react';
import { Mail, Shield, Zap, Clock, Check, ArrowRight, Code, Globe } from 'lucide-react';

const TempMailAPI = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const pricingRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Hero */}
      <section ref={heroRef} className="relative z-10 px-4 sm:px-6 py-20 text-center">
        <div className="max-w-7xl mx-auto animate-on-scroll">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            TempMail API
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
            API tạo email tạm thời mạnh mẽ nhất Việt Nam. Tích hợp dễ dàng, bảo mật tuyệt đối.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-4 rounded-full text-base sm:text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105 flex items-center space-x-2">
              <span>Bắt Đầu Ngay</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border border-white/30 px-8 py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-white/10 transition-colors">
              Xem Demo
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="relative z-10 px-4 sm:px-6 py-16">
        <div className="max-w-7xl mx-auto animate-on-scroll">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { label: 'API Calls/Tháng', value: '1M+', color: 'text-purple-400' },
              { label: 'Uptime', value: '99.9%', color: 'text-blue-400' },
              { label: 'Response Time', value: '500ms', color: 'text-indigo-400' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className={`text-4xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section ref={featuresRef} className="relative z-10 px-4 sm:px-6 py-20">
        <div className="max-w-7xl mx-auto animate-on-scroll">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Tính Năng Nổi Bật
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105"
              >
                <div className="text-purple-400 mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section ref={pricingRef} className="relative z-10 px-4 sm:px-6 py-20">
        <div className="max-w-7xl mx-auto animate-on-scroll">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Gói Dịch Vụ
          </h2>
          <p className="text-center text-gray-300 mb-16 text-base sm:text-xl">
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
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold mb-2">
                    {plan.price} <span className="text-lg font-normal text-gray-400">{plan.period}</span>
                  </div>
                  <p className="text-gray-400">{plan.requests} requests</p>
                </div>
                <ul className="space-y-4 mb-8 text-sm sm:text-base">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-full font-semibold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white'
                      : 'border border-white/30 hover:bg-white/10 text-white'
                  }`}
                >
                  Chọn Gói {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="relative z-10 px-4 sm:px-6 py-20">
        <div className="max-w-4xl mx-auto animate-on-scroll">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Tích Hợp Siêu Đơn Giản
          </h2>
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 ml-4">JavaScript</span>
            </div>
            <pre className="text-green-400 text-xs sm:text-sm overflow-x-auto whitespace-pre-wrap">
{`// Tạo email tạm thời
const response = await fetch('https://api.tempmail.vn/create', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log('Email tạm:', data.email);
// Output: temp_abc123@tempmail.vn`}
            </pre>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-4 sm:px-6 py-20">
        <div className="max-w-4xl mx-auto text-center animate-on-scroll">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Sẵn Sàng Bắt Đầu?
          </h2>
          <p className="text-base sm:text-xl text-gray-300 mb-8">
            Tham gia cùng hàng nghìn developer đang sử dụng TempMail API
          </p>
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 px-10 py-4 rounded-full text-lg sm:text-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105">
            Bắt Đầu Miễn Phí
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-4 sm:px-6 py-12 border-t border-white/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Mail className="w-6 h-6 text-purple-400" />
            <span className="text-xl font-bold">TempMail API</span>
          </div>
          <p className="text-gray-400 text-sm">© 2025 TempMail API. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TempMailAPI;
