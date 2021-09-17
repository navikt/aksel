import { useLayoutEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const canUseDOM = (): boolean => {
  return (
    typeof window !== "undefined" &&
    typeof window.document !== "undefined" &&
    typeof window.document.createElement !== "undefined"
  );
};

export const useClientLayoutEffect = canUseDOM() ? useLayoutEffect : () => {};

export const useId: (id?: string) => string = (id) => {
  const [newId, setNewId] = useState<string | undefined>(undefined);

  useClientLayoutEffect(() => {
    setNewId(uuidv4());
  }, []);

  return id ?? newId ?? "";
};
