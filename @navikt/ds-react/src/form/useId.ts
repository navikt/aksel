import { useEffect, useState } from "react";
import ShortUuid from "short-uuid";

const useId = (props?: { id?: string; prefix?: string }): string => {
  const { id = null, prefix = "" } = props ? props : {};
  const [localId, setlocalId] = useState<string>("");

  useEffect(() => {
    setlocalId(`${prefix}-${ShortUuid.generate()}`);
  }, [prefix]);

  return id ?? localId;
};

export default useId;
