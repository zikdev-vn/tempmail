// src/MyTracker.jsx
import React, { useState, useEffect } from 'react';
// Không cần import { useNavigate } nữa vì không dùng routing
// import { useNavigate } from 'react-router-dom'; 

import AddDebt from './expense-tracker/AddDebt';
import AddExpense from './expense-tracker/AddExpense';
import AddWorkDay from './expense-tracker/AddWorkDay';
import ExpenseList from './expense-tracker/ExpenseList';
import SummaryChart from './expense-tracker/SummaryChart';
import BudgetPlanner from './expense-tracker/BudgetPlanner'; // <--- Vẫn cần import BudgetPlanner
import EditModal from './expense-tracker/EditModal';

const MyTracker = () => {
  // const navigate = useNavigate(); // Bỏ dòng này

  // State để quản lý việc hiển thị màn hình
  const [showBudgetPlanner, setShowBudgetPlanner] = useState(false); // Mặc định hiển thị trang chính

  // Khởi tạo state và tải dữ liệu từ Local Storage
  const [workDays, setWorkDays] = useState(() => {
    const savedWorkDays = localStorage.getItem('workDays');
    return savedWorkDays ? JSON.parse(savedWorkDays) : [];
  });
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  const [debts, setDebts] = useState(() => {
    const savedDebts = localStorage.getItem('debts');
    return savedDebts ? JSON.parse(savedDebts) : [];
  });

  // Lưu dữ liệu vào Local Storage mỗi khi state thay đổi
  useEffect(() => {
    localStorage.setItem('workDays', JSON.stringify(workDays));
  }, [workDays]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('debts', JSON.stringify(debts));
  }, [debts]);

  // --- HÀM XỬ LÝ XÓA ---
  const handleDeleteItem = (id, type) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa mục này không?`)) {
      switch (type) {
        case 'expense':
          setExpenses(prev => prev.filter(item => item.id !== id));
          break;
        case 'debt':
          setDebts(prev => prev.filter(item => item.id !== id));
          break;
        case 'workday':
          setWorkDays(prev => prev.filter(item => item.id !== id));
          break;
        default:
          break;
      }
    }
  };

  // --- EDIT HANDLERS (ensure these are present or add them as per previous suggestions) ---
  const [editingItem, setEditingItem] = useState(null);

  const handleEditItem = (item) => {
    setEditingItem(item);
  };

  const handleUpdateItem = (updatedItem) => {
    switch (updatedItem.type) {
      case 'expense':
        setExpenses(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
        break;
      case 'debt':
        setDebts(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
        break;
      case 'workday':
        setWorkDays(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
        break;
      default:
        break;
    }
    setEditingItem(null); // Close modal after update
  };

  const handleCloseEditModal = () => {
    setEditingItem(null); // Close modal without saving
  };

  // Tính toán tổng quan để hiển thị
  const totalIncome = workDays.reduce((sum, item) => sum + (item.income || 0), 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + (item.amount || 0), 0);
  const totalDebts = debts.reduce((sum, item) => sum + (item.amount || 0), 0);
  const netBalance = totalIncome - totalExpenses - totalDebts;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg space-y-6">
      {/* Tiêu đề và nút chuyển đổi */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">
          📘 {showBudgetPlanner ? 'Quản lý dòng tiền dự kiến' : 'Quản lý chi tiêu cá nhân'}
        </h1>
        <button
          onClick={() => setShowBudgetPlanner(prev => !prev)} // <--- Chuyển đổi trạng thái hiển thị
          className='px-4 py-2 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-700 transition duration-200 shadow-md'
        >
          {showBudgetPlanner ? 'Quay lại trang chính' : 'Quản lý dòng tiền dự kiến'}
        </button>
      </div>

      {/* Conditional rendering: Hiển thị BudgetPlanner hoặc các thành phần MyTracker */}
      {showBudgetPlanner ? (
        // Nếu showBudgetPlanner là true, hiển thị BudgetPlanner
        <BudgetPlanner /> // <--- Render BudgetPlanner ở đây
      ) : (
        // Ngược lại, hiển thị các thành phần của MyTracker
        <>
          {/* Tổng quan */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="text-center">
              <p className="text-sm text-gray-600">Tổng Thu Nhập</p>
              <p className="text-xl font-bold text-green-600">${totalIncome.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Tổng Chi Tiêu</p>
              <p className="text-xl font-bold text-red-600">${totalExpenses.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Tổng Nợ</p>
              <p className="text-xl font-bold text-yellow-600">${totalDebts.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Số Dư Ròng</p>
              <p className={`text-xl font-bold ${netBalance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>${netBalance.toLocaleString()}</p>
            </div>
          </div>

          {/* Các thành phần thêm mới */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AddWorkDay workDays={workDays} setWorkDays={setWorkDays} />
            <AddExpense expenses={expenses} setExpenses={setExpenses} />
            <AddDebt debts={debts} setDebts={setDebts} />
          </div>

          {/* Hiển thị danh sách và biểu đồ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Danh sách các khoản</h2>
              <ExpenseList
                expenses={expenses}
                debts={debts}
                workDays={workDays}
                onDeleteItem={handleDeleteItem}
                onEditItem={handleEditItem}
              />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Biểu đồ tổng kết</h2>
              <SummaryChart expenses={expenses} debts={debts} workDays={workDays} />
            </div>
          </div>

          {editingItem && (
            <EditModal
              item={editingItem}
              onUpdate={handleUpdateItem}
              onClose={handleCloseEditModal}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MyTracker;