import { useState } from "react";
import {toast} from "react-toastify";


export const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetching = async (...args) => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (err) {
      toast.error(`${err.message}!`, {
          theme: "light",
        });
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return [fetching, isLoading, error];
};
