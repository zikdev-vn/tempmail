
//const URL_API = "http://localhost:8000"; // thay bằng API của bạn nếu khác

import axios from 'axios';

 // Đảm bảo URL chính xác
const URL_API = process.env.REACT_APP_API_URL ;
// API gọi để tạo email
export const createEmail = async () => {
  try {
    const res = await axios.post(`${URL_API}/createmail`);
    return res.data.data.name;  // Lấy email từ response
  } catch (err) {
    throw new Error('Không thể tạo email');
  }
};

// API gọi để lấy email
export const getEmails = async (email, limit = 50) => {
  try {
    const res = await axios.get(`${URL_API}/getmail/${email}?limit=${limit}`);
    return res.data.data.inbox || [];
  } catch (err) {
    // Lấy thông tin chi tiết từ backend
    const detail = err.response?.data?.detail || err.message;
    console.warn("API /getmail error:", detail);

    // Nếu bị limit thì return [] chứ không throw
    if (detail.includes("per 1 minute")) {
      return []; // ✅ Trả inbox rỗng để React hiển thị "Không có tin nhắn"
    }

    throw new Error(detail); // Các lỗi khác mới throw
  }
};

// API gọi để xóa email
export const deleteEmail = async (emailToDelete) => {
  try {
    const response = await axios.delete(`${URL_API}/deletemail/${emailToDelete}`);
    return response.data.message;  // Bạn có thể tùy chỉnh thông điệp trả về
  } catch (err) {
    throw new Error('Lỗi khi xóa email');
  }
};
