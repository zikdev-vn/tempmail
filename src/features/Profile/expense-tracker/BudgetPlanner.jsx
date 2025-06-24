// src/expense-tracker/BudgetPlanner.jsx
import React, { useState, useEffect } from 'react';

const generateId = () => Math.random().toString(36).substr(2, 9);

const BudgetPlanner = () => {
  // State cho các mục chi tiêu dự kiến
  const [budgetItems, setBudgetItems] = useState(() => {
    const savedBudget = localStorage.getItem('monthlyBudgetItems'); // Đổi tên key để tránh nhầm lẫn
    return savedBudget ? JSON.parse(savedBudget) : [];
  });

  // State cho tổng ngân sách mong muốn của tháng
  const [monthlyTotalBudget, setMonthlyTotalBudget] = useState(() => {
    const savedTotalBudget = localStorage.getItem('monthlyTotalBudget');
    // Lấy giá trị từ Local Storage, chuyển đổi sang số, mặc định là 0 nếu không có
    return savedTotalBudget ? parseFloat(savedTotalBudget) : 0;
  });

  // State cho form thêm mục chi tiêu
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  // State cho việc chọn tháng/năm, mặc định là tháng hiện tại
  const [monthYear, setMonthYear] = useState(new Date().toISOString().slice(0, 7));

  // --- Effect để lưu budgetItems vào Local Storage ---
  useEffect(() => {
    localStorage.setItem('monthlyBudgetItems', JSON.stringify(budgetItems));
  }, [budgetItems]);

  // --- Effect để lưu monthlyTotalBudget vào Local Storage ---
  useEffect(() => {
    localStorage.setItem('monthlyTotalBudget', monthlyTotalBudget.toString());
  }, [monthlyTotalBudget]);


  const handleAddItem = (e) => {
    e.preventDefault();
    if (!description || !amount || !monthYear) {
      alert('Vui lòng điền đầy đủ mô tả, số tiền và tháng/năm.');
      return;
    }
    const newItem = {
      id: generateId(),
      description: description,
      amount: parseFloat(amount),
      monthYear: monthYear,
      createdAt: new Date().toISOString(),
    };
    setBudgetItems(prev => [...prev, newItem]);
    setDescription('');
    setAmount('');
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa mục này?')) {
      setBudgetItems(prev => prev.filter(item => item.id !== id));
    }
  };

  // Hàm định dạng tiền tệ cho Yên Nhật
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(value);
  };

  // Lọc các khoản dự kiến theo tháng/năm đang được hiển thị
  const filteredBudgetItems = budgetItems.filter(item => item.monthYear === monthYear);
  const totalBudgetedItems = filteredBudgetItems.reduce((sum, item) => sum + item.amount, 0);

  // Tính toán số tiền còn lại/vượt quá
  const remainingBudget = monthlyTotalBudget - totalBudgetedItems;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg space-y-6">

      {/* Form nhập tổng ngân sách tháng */}
      <div className="bg-blue-50 p-4 rounded-lg shadow-sm border-blue-200 border">
        <h3 className="text-xl font-semibold mb-3 text-blue-800">Đặt tổng ngân sách tháng {monthYear.split('-')[1]}/{monthYear.split('-')[0]}</h3>
        <div>
          <label htmlFor="monthlyTotalBudget" className="block text-sm font-medium text-blue-700">Tổng ngân sách mong muốn (JPY):</label>
          <input
            type="number"
            id="monthlyTotalBudget"
            className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm p-2 text-lg font-bold"
            value={monthlyTotalBudget === 0 ? '' : monthlyTotalBudget} // Hiển thị rỗng nếu là 0
            onChange={(e) => setMonthlyTotalBudget(parseFloat(e.target.value) || 0)} // Chuyển đổi sang số, mặc định 0 nếu không hợp lệ
            placeholder="Ví dụ: 120000 (12 Vạn Yên)"
            min="0"
          />
        </div>
        <div className="mt-3 text-right">
            <p className="text-sm text-gray-600">Số tiền còn lại / vượt quá:</p>
            <p className={`text-xl font-bold ${remainingBudget >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                {formatCurrency(remainingBudget)}
            </p>
            {remainingBudget < 0 && (
                <p className="text-xs text-red-500 mt-1">Bạn đã vượt quá ngân sách dự kiến!</p>
            )}
        </div>
      </div>

      {/* Form thêm mới khoản chi tiêu dự kiến */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Thêm khoản chi tiêu dự kiến chi tiết</h3>
        <form onSubmit={handleAddItem} className="space-y-3">
          <div>
            <label htmlFor="budgetDescription" className="block text-sm font-medium text-gray-700">Mô tả chi tiêu:</label>
            <input
              type="text"
              id="budgetDescription"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ví dụ: Tiền thuê nhà, Tiền ăn..."
              required
            />
          </div>
          <div>
            <label htmlFor="budgetAmount" className="block text-sm font-medium text-gray-700">Số tiền dự kiến (JPY):</label>
            <input
              type="number"
              id="budgetAmount"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Ví dụ: 30000"
              required
            />
          </div>
          <div>
            <label htmlFor="monthYear" className="block text-sm font-medium text-gray-700">Tháng/Năm:</label>
            <input
              type="month"
              id="monthYear"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={monthYear}
              onChange={(e) => setMonthYear(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200 shadow-md"
          >
            Thêm khoản dự kiến
          </button>
        </form>
      </div>

      {/* Danh sách các khoản dự kiến */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Các khoản chi tiêu dự kiến chi tiết trong tháng {monthYear.split('-')[1]}/{monthYear.split('-')[0]}</h3>
        {filteredBudgetItems.length === 0 ? (
          <p className="text-gray-500 text-center">Chưa có khoản chi tiêu dự kiến chi tiết nào cho tháng này.</p>
        ) : (
          <ul className="space-y-2">
            {filteredBudgetItems.map(item => (
              <li key={item.id} className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm">
                <div>
                  <p className="font-semibold text-gray-800">{item.description}</p>
                  <p className="text-sm text-gray-500">
                    {formatCurrency(item.amount)}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="p-1 text-red-500 hover:text-red-700 transition-colors duration-200"
                  title="Xóa mục này"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 text-right font-bold text-lg text-purple-800">
          Tổng các khoản chi tiết: {formatCurrency(totalBudgetedItems)}
        </div>
      </div>
    </div>
  );
};

export default BudgetPlanner;