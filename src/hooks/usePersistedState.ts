import { useState, useEffect, Dispatch, SetStateAction } from "react";

type Response<T> = [T, Dispatch<SetStateAction<T>>];

function usePersistedState<T>(key: string, initialState: T): Response<T> {
  const [state, setState] = useState<T>(() => {
    const storageValue = localStorage.getItem(key);

    if (storageValue) {
      if (typeof initialState === "string") return storageValue;

      return JSON.parse(storageValue);
    }
    return initialState;
  });

  useEffect(() => {
    if (typeof initialState === "string") localStorage.setItem(key, `${state}`);
    else localStorage.setItem(key, JSON.stringify(state));
  }, [initialState, key, state]);

  return [state, setState];
}

export default usePersistedState;
