const URL_API = process.env.REACT_APP_API_URL ;




  export const getTransactions = async (token) => {
    const res = await fetch(`${URL_API}/my-transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return { ok: res.ok, data };
  };