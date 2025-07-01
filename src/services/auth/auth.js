const URL_API = process.env.REACT_APP_API_URL ;
//const URL_API = "http://160.30.21.53:8000/api";




export const login = async (email, password) => {
    const res = await fetch(`${URL_API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: email, password }),
    });
    const data = await res.json();
    return { ok: res.ok, data };
  };

export const register = async (name, email, password ,username) => {
  const res = await fetch(`${URL_API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, username }),
  });
  const data = await res.json();
  return { ok: res.ok, data };
}

export const whoami = async (token) => {
  const res = await fetch(`${URL_API}/whoami`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return { ok: res.ok, data };
};

export const googleLogin = async (googleToken) => {
  try {
    const res = await fetch(`${URL_API}/google-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: googleToken }),
    });

    const data = await res.json(); // Phân tích dữ liệu JSON bất kể trạng thái

    if (res.ok) { // Kiểm tra xem mã trạng thái HTTP có nằm trong khoảng 200-299 không
      // Cuộc gọi API thành công, trả về dữ liệu cùng với một cờ thành công
      return { success: true, user: data }; // Thêm cờ 'success' và đối tượng 'user'
    } else {
      // Cuộc gọi API trả về trạng thái lỗi (ví dụ: 400, 500)
      // Đối tượng `data` có thể chứa thông báo lỗi từ backend của bạn
      return { success: false, error: data.message || "Đăng nhập Google thất bại." };
    }
  } catch (error) {
    // Đoạn này bắt các lỗi mạng hoặc các vấn đề với chính yêu cầu fetch
    console.error("Lỗi khi gọi API Google Login:", error);
    return { success: false, error: "Không thể kết nối đến máy chủ. Vui lòng thử lại sau." };
  }
};