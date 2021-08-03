import { useRef } from "react";
import ShortUuid from "short-uuid";
/* import { v4 as uuidv4 } from "uuid"; */

const useId = (id?: string): string => {
  const localId = useRef(ShortUuid.generate()).current;
  return id ?? localId;
};

export default useId;
