import { useRef } from "react";
import ShortUuid from "short-uuid";
/* import { v4 as uuidv4 } from "uuid"; */

const useId = (props?: { id?: string; prefix?: string }): string => {
  const { id = null, prefix = "" } = props ? props : {};

  const localId = useRef(`${prefix}-${ShortUuid.generate()}`).current;
  return id ?? localId;
};

export default useId;
