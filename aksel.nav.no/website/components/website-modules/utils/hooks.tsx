import { useEffect, useState } from "react";
import { _checkAuth } from "@sanity/preview-kit";
import { config } from "../../../lib/sanity/config";

export const useDebounce = (value: any) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeOut = setTimeout(() => setDebouncedValue(value), 200);

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
