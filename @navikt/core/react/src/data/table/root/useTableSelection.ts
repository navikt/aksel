import { useCallback, useRef } from "react";

function useTableSelection() {
  const values = useRef(new Set<string>());

  const register = useCallback((value: string) => {
    values.current.add(value);
  }, []);

  const unRegister = useCallback((value: string) => {
    values.current.delete(value);
  }, []);

  return {
    register,
    unRegister,
    values: values.current,
  };
}

export { useTableSelection };
