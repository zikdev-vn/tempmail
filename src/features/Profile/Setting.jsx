import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const SettingsForm = () => {
  const settingsRef = useRef();
  const [settings, setSettings] = useState({
    notifications: true,
    autoDelete: false,
    language: 'vi'
  });

  useEffect(() => {
    gsap.fromTo(settingsRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 });
  }, []);

  const handleToggle = (field) => {
    setSettings(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div ref={settingsRef} className="max-w-xl mx-auto p-6 bg-white/10 border border-white/20 rounded-2xl text-black backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-6">Cài đặt</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Thông báo</span>
          <input type="checkbox" checked={settings.notifications} onChange={() => handleToggle('notifications')} />
        </div>

        <div className="flex items-center justify-between">
          <span>Tự động xóa email</span>
          <input type="checkbox" checked={settings.autoDelete} onChange={() => handleToggle('autoDelete')} />
        </div>

        <div>
          <label>Ngôn ngữ</label>
          <select
            value={settings.language}
            onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
            className="w-full mt-2 p-3 rounded-lg bg-white/10 text-gray-600"
          >
            <option value="vi">Tiếng Việt</option>
            <option value="en">English</option>
            <option value="jp">日本語</option>
          </select>
        </div>
      </div>

      <button className="mt-6 bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 rounded-lg text-black">
        Lưu cài đặt
      </button>
    </div>
  );
};

export default SettingsForm;
