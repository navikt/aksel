import { useCallback, useEffect, useRef, useState } from "react";
import { _checkAuth } from "@sanity/preview-kit";
import { throttle } from "lodash";
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

export const useThrottle = (cb: any, delay: number) => {
  const cbRef = useRef<any>(cb);

  useEffect(() => {
    cbRef.current = cb;
  });

  return useCallback(
    () =>
      throttle((...args) => cbRef.current(...args), delay, {
        leading: true,
        trailing: true,
      }),
    [delay]
  );
};
