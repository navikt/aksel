import { _checkAuth } from "@sanity/preview-kit";
import { useEffect, useState } from "react";
import { config } from "../../../lib/sanity/config";

export const useDebounce = (value: any) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeOut = setTimeout(() => setDebouncedValue(value), 300);

    return () => clearTimeout(timeOut);
  }, [value]);

  return debouncedValue;
};

export const useCheckAuth = () => {
  const [user, setUser] = useState<boolean>(true);

  useEffect(() => {
    _checkAuth(config.projectId, null).then(setUser);
  }, []);

  return user;
};
