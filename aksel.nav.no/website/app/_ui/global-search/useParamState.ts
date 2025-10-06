"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef } from "react";

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
  const lastAppliedRef = useRef<string>(currentValue);

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

      /* Exit early if value matches the last applied (rapid calls before snapshot updates) */
      if ((isClearing ? "" : normalized) === lastAppliedRef.current) {
        return;
      }

      const nextUrl = buildUrl(isClearing ? null : normalized);
      replace(nextUrl);
      lastAppliedRef.current = isClearing ? "" : normalized;
    },
    [buildUrl, replace],
  );

  const clearParam = useCallback(() => {
    if (lastAppliedRef.current === "" && currentValue === "") {
      return;
    }

    const nextUrl = buildUrl(null);
    replace(nextUrl);
    lastAppliedRef.current = "";
  }, [buildUrl, currentValue, replace]);

  return {
    paramValue: currentValue,
    hasParam: currentValue !== "",
    setParam,
    clearParam,
    buildUrl,
  };
}

export { useParamState };
