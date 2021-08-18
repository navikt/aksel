import { useLayoutEffect, useState } from "react";
import ShortUuid from "short-uuid";

const canUseDOM = (): boolean => {
  return (
    typeof window !== "undefined" &&
    typeof window.document !== "undefined" &&
    typeof window.document.createElement !== "undefined"
  );
};

const useClientLayoutEffect = canUseDOM() ? useLayoutEffect : () => {};

export const useId: (id?: string) => string = (id) => {
  const [newId, setNewId] = useState<string | undefined>(undefined);

  useClientLayoutEffect(() => {
    setNewId(ShortUuid.generate());
  }, []);

  return id ?? newId ?? "";
};
