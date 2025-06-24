import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Upload, Save, Eye, EyeOff } from 'lucide-react';

const EditProfileForm = () => {
  const formRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    avatar: null
  });

  useEffect(() => {
    gsap.fromTo(formRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 });
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleChange('avatar', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div ref={formRef} className="max-w-2xl mx-auto p-6 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-white mb-6">Chỉnh sửa hồ sơ</h2>

      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gray-700 overflow-hidden">
          {formData.avatar ? (
            <img src={formData.avatar} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">Ảnh</div>
          )}
        </div>
        <label className="mt-2 text-purple-400 cursor-pointer">
          <Upload className="inline w-4 h-4" /> Tải ảnh
          <input type="file" className="hidden" onChange={handleImageUpload} />
        </label>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Họ và tên"
          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
          value={formData.username}
          onChange={(e) => handleChange('username', e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mật khẩu mới"
            className="w-full p-3 pr-12 bg-white/10 border border-white/20 rounded-lg text-white"
          />
          <button
            type="button"
            className="absolute top-3 right-3 text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <button className="mt-6 bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 rounded-lg text-white flex items-center gap-2">
        <Save className="w-4 h-4" /> Lưu thay đổi
      </button>
    </div>
  );
};

export default EditProfileForm;
