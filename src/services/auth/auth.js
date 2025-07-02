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

    const data = await res.json(); 

    if (res.ok) { 
      
      return { success: true, user: data }; 
    } else {
      
      return { success: false, error: data.message || "Đăng nhập Google thất bại." };
    }
  } catch (error) {
   
    console.error("Lỗi khi gọi API Google Login:", error);
    return { success: false, error: "Không thể kết nối đến máy chủ. Vui lòng thử lại sau." };
  }
};
