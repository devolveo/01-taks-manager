import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);

      if (saved === null) {
        return defaultValue;
      }

      return JSON.parse(saved);
    } catch (error) {
      console.error(`Error loading ${key} from localStorage: `, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage: `, error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export default useLocalStorage;
