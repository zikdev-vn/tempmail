// src/expense-tracker/AddDebt.jsx
import React, { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

const AddDebt = ({ debts, setDebts }) => {
  const [person, setPerson] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('owe'); // 'owe' (nợ người khác) or 'owed' (người khác nợ mình)
  const formRef = useRef(null);

  // Lấy ngày hiện tại để làm giá trị mặc định cho nợ
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today.toISOString().slice(0, 10)); // YYYY-MM-DD

  useLayoutEffect(() => {
    gsap.fromTo(formRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.4 });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!person || !amount) {
      alert('Vui lòng nhập tên và số tiền!');
      return;
    }

    const newDebt = {
      id: Date.now(),
      person: person,
      amount: parseFloat(amount),
      type: type,
      date: selectedDate, // Sử dụng ngày đã chọn
    };

    setDebts((prevDebts) => [...prevDebts, newDebt]);

    gsap.to(formRef.current, { scale: 1.02, duration: 0.1, yoyo: true, repeat: 1, ease: "power1.inOut" });

    setPerson('');
    setAmount('');
    // Giữ nguyên ngày đã chọn để tiện nhập các khoản nợ cùng ngày
    // hoặc đặt lại về ngày hiện tại: setSelectedDate(new Date().toISOString().slice(0, 10));
  };

  // Hàm xử lý khi nhấn Enter trên các input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div ref={formRef} className="p-4 border rounded-lg shadow-sm bg-red-50">
      <h3 className="text-lg font-semibold mb-3 text-red-800">💰 Thêm Khoản Nợ</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="debtDate" className="block text-sm font-medium text-gray-700">Ngày phát sinh</label>
          <input
            type="date"
            id="debtDate"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="debtPerson" className="block text-sm font-medium text-gray-700">Đối tượng</label>
          <input
            type="text"
            id="debtPerson"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500"
            value={person}
            onChange={(e) => setPerson(e.target.value)}
            placeholder="Ví dụ: Bạn An"
            onKeyDown={handleKeyDown}
            required
          />
        </div>
        <div>
          <label htmlFor="debtAmount" className="block text-sm font-medium text-gray-700">Số tiền (VND)</label>
          <input
            type="number"
            id="debtAmount"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            step="1000"
            onKeyDown={handleKeyDown} // Bắt sự kiện Enter
            required
          />
        </div>
        <div>
          <label htmlFor="debtType" className="block text-sm font-medium text-gray-700">Loại nợ</label>
          <select
            id="debtType"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="owe">Tôi nợ</option>
            <option value="owed">Người khác nợ tôi</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200 shadow-md"
        >
          Thêm Nợ
        </button>
      </form>
    </div>
  );
};

export default AddDebt;