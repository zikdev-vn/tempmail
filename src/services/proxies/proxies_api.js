const URL_API = process.env.REACT_APP_API_URL ;


export const fetchProxies = async () => {
    const res = await fetch(`${URL_API}/proxies`);
    const data = await res.json();
    return data.proxies || [];
  };
  
export const checkProxyStatus = async () => {
    const res = await fetch(URL_API);
    const data = await res.json();
    return data;
  };
  
export const refreshProxies = async (apiKey) => {
    const res = await fetch(`${URL_API}/proxies/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to refresh proxies");
    }
  };