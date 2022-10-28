import { useEffect, useState } from "react";

export const useDebounce = (value: any) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeOut = setTimeout(() => setDebouncedValue(value), 200);

    return () => clearTimeout(timeOut);
  }, [value]);

  return debouncedValue;
};
