import { useCallback, useEffect, useState } from "react";

export async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "something went wrong");
  }
  return data;
}
function useHttp(url, config) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(); 
  const [isLoading, setIsLoading] = useState(false);

  const sendResquest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, {...config,boby: data});
        setData(resData);
      } catch (error) {
        setError(error.message || "Something wrong !");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if (config && (config.method === "GET" || !config.method) || !config) {
      sendResquest();
    }
  }, [sendResquest]);
  return {
    data,
    isLoading,
    error,
    sendResquest,
  };
}

export default useHttp;
