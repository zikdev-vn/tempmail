const URL_API = process.env.REACT_APP_API_URL ;


//const URL_API = "http://localhost:8000"; // thay bằng API của bạn nếu khác

export const createTempMail = async () => {
  const requestTime = Date.now().toString();
  //const signature = await sign(requestTime); // gọi tới backend bạn nếu cần

  const res = await fetch(`${URL_API}/createmail`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ requestTime, lang: "us"}),
  });

  return res.json();
};

export const getInbox = async (email) => {
  const res = await fetch(`${URL_API}/getmail/${email}`);
  return res.json();
};

export const deleteMail = async (email) => {
  const res = await fetch(`${URL_API}/deletemail/${email}`, { method: "DELETE" });
  return res.json();
};
