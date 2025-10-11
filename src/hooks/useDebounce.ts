import { useState, useEffect } from "react";

function useDebounce<T>(value: T, delay: number) {
  const [debounceValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // setup a timer
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debounceValue;
}

export default useDebounce;
