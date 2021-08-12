import { useContext, useMemo } from "react";
import ShortUuid from "short-uuid";
import { SSRContext } from ".";

export const useId = (props?: { id?: string; prefix?: string }): string => {
  const ssr = useContext(SSRContext);

  const { id = null, prefix = "" } = props ? props : {};

  console.log(prefix);
  return useMemo(
    () =>
      id ??
      (!!ssr
        ? `${prefix}-${++ssr.idCounter}`
        : `${prefix}-${ShortUuid.generate()}`),
    [id, prefix, ssr]
  );
};
