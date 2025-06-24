// src/expense-tracker/ExpenseList.jsx
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Nhận thêm prop onDeleteItem và onEditItem
const ExpenseList = ({ expenses, debts, workDays, onDeleteItem, onEditItem }) => {
  const listRef = useRef(null);

  // Gộp tất cả các loại mục và sắp xếp theo ngày (mới nhất lên đầu)
  // Đảm bảo item.type được set đúng và có trường debtType cho các khoản nợ
  const allItems = [
    ...expenses.map(item => ({ ...item, type: 'expense', category: 'Chi tiêu' })),
    // Cần đảm bảo 'debtType' được lưu trong item khi thêm/sửa nợ.
    // Giả định item.type ở đây là loại giao dịch (debt, expense, workday)
    // Và item.debtType là loại nợ (owe, owed)
    ...debts.map(item => ({
      ...item,
      type: 'debt',
      category: item.debtType === 'owe' ? 'Nợ phải trả' : 'Nợ phải thu' // Sử dụng item.debtType
    })),
    ...workDays.map(item => ({ ...item, type: 'workday', category: 'Thu nhập' })),
  ].sort((a, b) => {
    // Sắp xếp giảm dần theo ngày, mục nào không có date thì dùng createdAt
    const dateA = new Date(a.date || a.createdAt); // createdAt nên là fallback chung
    const dateB = new Date(b.date || b.createdAt);
    return dateB - dateA;
  });

  useLayoutEffect(() => {
    if (listRef.current) {
      gsap.fromTo(listRef.current.children,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.08, duration: 0.5, ease: "power2.out", delay: 0.2 }
      );
    }
  }, [expenses, debts, workDays]); // Re-run animation when any list changes

  // Hàm hiển thị số tiền và màu sắc tương ứng
  const getAmountDisplay = (item) => {
    let amountValue;
    let textColorClass;
    let prefix = ''; // Dấu + hoặc -

    if (item.type === 'expense') {
      amountValue = item.amount;
      textColorClass = 'text-red-600';
      prefix = '-';
    } else if (item.type === 'debt') {
      amountValue = item.amount;
      // Kiểm tra item.debtType để xác định màu và dấu
      if (item.debtType === 'owe') { // Tôi nợ người khác -> Chi ra
        textColorClass = 'text-red-600';
        prefix = '-';
      } else { // Người khác nợ tôi -> Thu vào
        textColorClass = 'text-green-600';
        prefix = '+';
      }
    } else if (item.type === 'workday') {
      amountValue = item.income;
      textColorClass = 'text-green-600';
      prefix = '+';
    } else {
      amountValue = 0;
      textColorClass = 'text-gray-800';
    }

    return (
      <p className={`text-lg font-bold ${textColorClass}`}>
        {prefix}{amountValue ? amountValue.toLocaleString('vi-VN') : '0'} VND {/* Dùng toLocaleString với 'vi-VN' */}
      </p>
    );
  };

  if (allItems.length === 0) {
    return <p className="text-gray-500 text-center py-4">Chưa có giao dịch nào được ghi nhận.</p>;
  }

  return (
    <div className="overflow-y-auto max-h-96"> {/* Đảm bảo có max-h và overflow-y-auto */}
      <ul ref={listRef} className="space-y-3">
        {allItems.map((item) => (
          <li key={item.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-md shadow-sm">
            <div className="flex-grow">
              <p className="text-lg font-semibold text-gray-800">
                {item.type === 'expense' && item.description}
                {item.type === 'debt' && (item.debtType === 'owe' ? `Nợ ${item.person}` : `${item.person} nợ`)} {/* Sử dụng item.debtType */}
                {item.type === 'workday' && `Thu nhập ngày làm việc`}
              </p>
              <p className="text-sm text-gray-500">
                {item.date ? new Date(item.date).toLocaleDateString('vi-VN') : 'N/A'} {/* Định dạng ngày Việt Nam */}
                {item.category && <span className="ml-2 text-xs font-bold text-gray-600">[{item.category}]</span>}
              </p>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              {getAmountDisplay(item)}
              {/* Nút Sửa */}
              <button
                onClick={() => onEditItem(item)} // Truyền toàn bộ item để sửa
                className="p-1 text-blue-500 hover:text-blue-700 transition-colors duration-200"
                title="Chỉnh sửa mục này"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.38-2.828-2.829z" />
                </svg>
              </button>
              {/* Nút Xóa */}
              <button
                onClick={() => onDeleteItem(item.id, item.type)}
                className="ml-2 p-1 text-red-500 hover:text-red-700 transition-colors duration-200"
                title="Xóa mục này"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                  </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;