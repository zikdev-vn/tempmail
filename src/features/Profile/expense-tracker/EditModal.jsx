// src/expense-tracker/EditModal.jsx
import React, { useState, useEffect } from 'react';

const EditModal = ({ item, onUpdate, onClose }) => {
  // State cục bộ để quản lý dữ liệu đang được chỉnh sửa trong modal
  const [editedDescription, setEditedDescription] = useState('');
  const [editedAmount, setEditedAmount] = useState('');
  const [editedDate, setEditedDate] = useState('');
  const [editedIncome, setEditedIncome] = useState(''); // Cho WorkDay
  const [editedPerson, setEditedPerson] = useState(''); // Cho Debt
  const [editedType, setEditedType] = useState('');     // Cho Debt (owe/owed)

  // Cập nhật state cục bộ khi `item` prop thay đổi
  useEffect(() => {
    if (item) {
      setEditedDescription(item.description || '');
      setEditedAmount(item.amount || '');

      // Định dạng ngày cho input type="date" hoặc "datetime-local"
      if (item.date) {
        const dateObj = new Date(item.date);
        // Kiểm tra xem dateObj có hợp lệ không trước khi định dạng
        if (!isNaN(dateObj)) {
            // Đối với input type="date" (YYYY-MM-DD)
            setEditedDate(dateObj.toISOString().split('T')[0]);
            // Nếu dùng input type="datetime-local", sẽ là:
            // setEditedDate(dateObj.toISOString().slice(0, 16));
        } else {
            setEditedDate(''); // Xóa nếu ngày không hợp lệ
        }
      } else {
        setEditedDate('');
      }

      // Các trường đặc thù cho từng loại item
      if (item.type === 'workday') {
        setEditedIncome(item.income || '');
      } else {
        setEditedIncome('');
      }

      if (item.type === 'debt') {
        setEditedPerson(item.person || '');
        setEditedType(item.type || 'owe'); // Mặc định là 'owe'
      } else {
        setEditedPerson('');
        setEditedType('');
      }
    }
  }, [item]);

  // Hàm xử lý khi người dùng nhấn "Lưu"
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editedDescription && !editedAmount && !editedIncome && !editedPerson) {
        alert("Vui lòng nhập ít nhất một trường để cập nhật.");
        return;
    }

    const updatedItem = {
      ...item, // Giữ lại các thuộc tính không thay đổi (như id, type)
      description: editedDescription,
      amount: parseFloat(editedAmount) || 0, // Chuyển đổi sang số, mặc định là 0 nếu không hợp lệ
      date: editedDate ? new Date(editedDate).toISOString() : item.date, // Dùng ngày mới hoặc ngày cũ
    };

    // Cập nhật các trường đặc thù
    if (item.type === 'workday') {
      updatedItem.income = parseFloat(editedIncome) || 0;
    }
    if (item.type === 'debt') {
      updatedItem.person = editedPerson;
      updatedItem.type = editedType;
    }

    onUpdate(updatedItem); // Gọi hàm onUpdate từ component cha
  };

  if (!item) return null; // Không hiển thị modal nếu không có item nào được chọn để chỉnh sửa

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 shadow-xl w-full max-w-md relative animate-slideUp">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
          Chỉnh sửa {item.type === 'expense' ? 'Chi tiêu' : item.type === 'debt' ? 'Nợ' : 'Ngày làm việc'}
        </h2>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          aria-label="Đóng"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="editDescription" className="block text-sm font-medium text-gray-700">Mô tả:</label>
            <input
              type="text"
              id="editDescription"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
          </div>

          {/* Hiển thị trường 'Số tiền' hoặc 'Thu nhập' tùy loại item */}
          {item.type !== 'workday' && (
            <div>
              <label htmlFor="editAmount" className="block text-sm font-medium text-gray-700">Số tiền:</label>
              <input
                type="number"
                id="editAmount"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={editedAmount}
                onChange={(e) => setEditedAmount(e.target.value)}
              />
            </div>
          )}

          {item.type === 'workday' && (
            <div>
              <label htmlFor="editIncome" className="block text-sm font-medium text-gray-700">Thu nhập:</label>
              <input
                type="number"
                id="editIncome"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={editedIncome}
                onChange={(e) => setEditedIncome(e.target.value)}
              />
            </div>
          )}

          <div>
            <label htmlFor="editDate" className="block text-sm font-medium text-gray-700">Ngày:</label>
            <input
              type="date" // Sử dụng input type="date" cho việc chọn ngày
              id="editDate"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
            />
          </div>

          {/* Trường đặc thù cho Debt */}
          {item.type === 'debt' && (
            <>
              <div>
                <label htmlFor="editPerson" className="block text-sm font-medium text-gray-700">Người liên quan:</label>
                <input
                  type="text"
                  id="editPerson"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={editedPerson}
                  onChange={(e) => setEditedPerson(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="editDebtType" className="block text-sm font-medium text-gray-700">Loại nợ:</label>
                <select
                  id="editDebtType"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={editedType}
                  onChange={(e) => setEditedType(e.target.value)}
                >
                  <option value="owe">Tôi nợ người khác</option>
                  <option value="owed">Người khác nợ tôi</option>
                </select>
              </div>
            </>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200 font-semibold"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 font-semibold"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;