import { useEffect, useRef, useState } from "react";
import ShortUuid from "short-uuid";
/* import { v4 as uuidv4 } from "uuid"; */

const useId = (props?: { id?: string; prefix?: string }): string => {
  const { id = null, prefix = "" } = props ? props : {};

  // const localId = useRef(`${prefix}-${ShortUuid.generate()}`).current;

  const [localId, setlocalId] = useState<string>("");

  useEffect(() => {
    setlocalId(`${prefix}-${ShortUuid.generate()}`);
  }, [prefix]);

  return id ?? localId;
};

export default useId;
