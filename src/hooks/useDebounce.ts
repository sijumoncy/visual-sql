import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number) {
  const [debounceValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;
}
