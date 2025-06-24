// src/expense-tracker/AddExpense.jsx
import React, { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

const AddExpense = ({ expenses, setExpenses }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const formRef = useRef(null);

  // Lấy ngày hiện tại để làm giá trị mặc định cho chi tiêu
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today.toISOString().slice(0, 10)); // YYYY-MM-DD

  useLayoutEffect(() => {
    gsap.fromTo(formRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.2 });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) {
      alert('Vui lòng nhập mô tả và số tiền chi tiêu!');
      return;
    }

    const newExpense = {
      id: Date.now(),
      description: description,
      amount: parseFloat(amount),
      date: selectedDate, // Sử dụng ngày đã chọn
    };

    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

    gsap.to(formRef.current, { scale: 1.02, duration: 0.1, yoyo: true, repeat: 1, ease: "power1.inOut" });

    setDescription('');
    setAmount('');
    // Giữ nguyên ngày đã chọn để tiện nhập các chi tiêu cùng ngày
    // hoặc đặt lại về ngày hiện tại: setSelectedDate(new Date().toISOString().slice(0, 10));
  };

  // Hàm xử lý khi nhấn Enter trên các input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div ref={formRef} className="p-4 border rounded-lg shadow-sm bg-green-50">
      <h3 className="text-lg font-semibold mb-3 text-green-800">💸 Thêm Chi Tiêu</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="expDate" className="block text-sm font-medium text-gray-700">Ngày chi tiêu</label>
          <input
            type="date"
            id="expDate"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="expDescription" className="block text-sm font-medium text-gray-700">Mô tả</label>
          <input
            type="text"
            id="expDescription"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ví dụ: Tiền ăn trưa"
            onKeyDown={handleKeyDown}
            required
          />
        </div>
        <div>
          <label htmlFor="expAmount" className="block text-sm font-medium text-gray-700">Số tiền (VND)</label>
          <input
            type="number"
            id="expAmount"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            step="1000"
            onKeyDown={handleKeyDown} // Bắt sự kiện Enter
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 shadow-md"
        >
          Thêm Chi Tiêu
        </button>
      </form>
    </div>
  );
};

export default AddExpense;