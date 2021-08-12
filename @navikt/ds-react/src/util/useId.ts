import { useEffect, useLayoutEffect, useState } from "react";
import ShortUuid from "short-uuid";

const canUseDOM = (): boolean => {
  return (
    typeof window !== "undefined" &&
    typeof window.document !== "undefined" &&
    typeof window.document.createElement !== "undefined"
  );
};

const useIsomorphicLayoutEffect = canUseDOM() ? useLayoutEffect : useEffect;

export const useId: (id?: string) => string = (id) => {
  const [newId, setNewId] = useState<string | undefined>(undefined);

  useIsomorphicLayoutEffect(() => {
    setNewId(ShortUuid.generate());
  }, []);

  console.count("generate id");
  return id ?? newId ?? "";
};
