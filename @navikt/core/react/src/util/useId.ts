import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useIsomorphicLayoutEffect } from "react-use";

export const useId: (id?: string) => string = (id) => {
  const [newId, setNewId] = useState<string | undefined>(undefined);

  useIsomorphicLayoutEffect(() => {
    setNewId(uuidv4());
  }, []);

  return id ?? newId ?? "";
};
