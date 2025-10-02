"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

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
  const { replace } = useRouter();

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
      const nextUrl = buildUrl(value !== "" ? value : null);

      const currentUrl = buildUrl(currentValue || null);
      if (nextUrl === currentUrl) {
        return;
      }

      replace(nextUrl);
    },
    [buildUrl, currentValue, replace],
  );

  const clearParam = useCallback(() => {
    const nextUrl = buildUrl(null);
    const currentUrl = buildUrl(currentValue || null);
    if (nextUrl !== currentUrl) {
      replace(nextUrl);
    }
  }, [buildUrl, currentValue, replace]);

  const paramValue = useMemo(() => currentValue, [currentValue]);

  return {
    paramValue,
    hasParam: paramValue !== "",
    setParam,
    clearParam,
    buildUrl,
  };
}

export { useParamState };
