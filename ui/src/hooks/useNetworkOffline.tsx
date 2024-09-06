import { useEffect, useState } from "react";

const useNetworkOffline = () => {
  const [isNetworkOffline, setIsNetworkOffline] = useState(!navigator.onLine);

  const handleOnOffLine = () => {
    setIsNetworkOffline(() => !navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("online", handleOnOffLine);
    window.addEventListener("offline", handleOnOffLine);

    return () => {
      window.removeEventListener("online", handleOnOffLine);
      window.removeEventListener("offline", handleOnOffLine);
    };
  }, []);

  return isNetworkOffline;
};

export default useNetworkOffline;
