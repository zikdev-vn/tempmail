


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
    return res.data.data.inbox;
  } catch (err) {
    throw new Error('Lỗi khi lấy email');
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
