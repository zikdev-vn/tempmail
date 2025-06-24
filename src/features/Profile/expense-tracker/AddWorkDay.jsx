// src/expense-tracker/AddWorkDay.jsx
import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';

const AddWorkDay = ({ workDays, setWorkDays }) => {
  const formRef = useRef(null);

  // Lấy ngày, tháng, năm hiện tại để làm giá trị mặc định
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1); // getMonth() trả về 0-11
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [income, setIncome] = useState('');

  // Tạo danh sách các năm (ví dụ: 5 năm trước đến 1 năm sau)
  const years = Array.from({ length: 7 }, (_, i) => today.getFullYear() - 5 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1); // 1 đến 12

  useLayoutEffect(() => {
    gsap.fromTo(formRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi submit mặc định của form

    if (!selectedDay || !selectedMonth || !selectedYear || !income) {
      alert('Vui lòng chọn đầy đủ ngày, tháng, năm và nhập số tiền thu nhập!');
      return;
    }

    // Định dạng lại ngày về YYYY-MM-DD
    const formattedMonth = String(selectedMonth).padStart(2, '0');
    const formattedDay = String(selectedDay).padStart(2, '0');
    const fullDate = `${selectedYear}-${formattedMonth}-${formattedDay}`;

    const newWorkDay = {
      id: Date.now(),
      date: fullDate,
      income: parseFloat(income),
    };

    setWorkDays((prevWorkDays) => [...prevWorkDays, newWorkDay]);

    gsap.to(formRef.current, { scale: 1.02, duration: 0.1, yoyo: true, repeat: 1, ease: "power1.inOut" });

    // Reset chỉ thu nhập, giữ lại ngày, tháng, năm để tiện nhập tiếp
    setIncome('');
    // Hoặc bạn có thể đặt lại ngày về ngày hiện tại nếu muốn
    // setSelectedDay(today.getDate());
    // setSelectedMonth(today.getMonth() + 1);
    // setSelectedYear(today.getFullYear());
  };

  // Hàm xử lý khi nhấn Enter trên các input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div ref={formRef} className="p-4 border rounded-lg shadow-sm bg-purple-50">
      <h3 className="text-lg font-semibold mb-3 text-purple-800">🗓️ Thêm Ngày Làm Việc</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="workDate" className="block text-sm font-medium text-gray-700">Ngày làm việc</label>
          <div className="flex space-x-2">
            {/* Chọn Ngày */}
            <input
              type="number"
              id="workDay"
              className="mt-1 block w-1/3 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-purple-500 focus:border-purple-500 text-center"
              value={selectedDay}
              onChange={(e) => setSelectedDay(parseInt(e.target.value) || '')}
              min="1"
              max="31"
              placeholder="Ngày"
              onKeyDown={handleKeyDown}
              required
            />
            {/* Chọn Tháng */}
            <select
              id="workMonth"
              className="mt-1 block w-1/3 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-purple-500 focus:border-purple-500"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              required
            >
              {months.map(month => (
                <option key={month} value={month}>Tháng {month}</option>
              ))}
            </select>
            {/* Chọn Năm */}
            <select
              id="workYear"
              className="mt-1 block w-1/3 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-purple-500 focus:border-purple-500"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              required
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="workIncome" className="block text-sm font-medium text-gray-700">Thu nhập (VND)</label>
          <input
            type="number"
            id="workIncome"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-purple-500 focus:border-purple-500"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="0"
            step="1000"
            onKeyDown={handleKeyDown} // Bắt sự kiện Enter
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200 shadow-md"
        >
          Thêm Ngày
        </button>
      </form>
    </div>
  );
};

export default AddWorkDay;