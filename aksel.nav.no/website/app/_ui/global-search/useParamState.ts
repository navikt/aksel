"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface UseParamStateResult {
  paramValue: string;
  hasParam: boolean;
  setParam: (value: string) => void;
  clearParam: () => void;
  buildUrl: (nextValue: string | null | undefined) => string;
}

function useParamState(param: string): UseParamStateResult {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentValue = searchParams?.get(param) ?? "";

  const buildUrl = useCallback(
    (nextValue: string | null | undefined) => {
      const params = new URLSearchParams(searchParams ?? undefined);
      if (nextValue) {
        params.set(param, nextValue);
      } else {
        params.delete(param);
      }
      const search = params.toString();
      return pathname + (search ? `?${search}` : "");
    },
    [param, pathname, searchParams],
  );

  const setParam = useCallback(
    (value: string) => {
      const normalized = value.trim();
      const isClearing = normalized === "";

      const nextUrl = buildUrl(isClearing ? null : normalized);
      window.history.replaceState(null, "", nextUrl);
    },
    [buildUrl],
  );

  const clearParam = useCallback(() => {
    const nextUrl = buildUrl(null);
    window.history.replaceState(null, "", nextUrl);
  }, [buildUrl]);

  return {
    paramValue: currentValue,
    hasParam: currentValue !== "",
    setParam,
    clearParam,
    buildUrl,
  };
}

export { useParamState };
