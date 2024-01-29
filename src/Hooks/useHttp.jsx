import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();
  console.log('response',resData)
  if (!response.ok) {
    throw new Error(data.message || "something went wrong");
  }
  return resData;
}

//custom hoook
function useHttp(url, config,initialData) {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(); 
  const [isLoading, setIsLoading] = useState(false);

  function clearData(){
    setData(initialData);
  }

  const sendResquest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, {...config,body: data});
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
  }, [sendResquest,config]);

  return {
    data,
    isLoading,
    error,
    sendResquest,
    clearData
  };
}

export default useHttp;
