const URL_API = process.env.REACT_APP_API_URL ;
//const URL_API = "http://160.30.21.53:8000/api";
const SECRET_KEY = process.env.REACT_APP_SECRET_KEY ;



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
  const res = await fetch(`${URL_API}/google-login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: googleToken }),
  });
  return res.json();
};