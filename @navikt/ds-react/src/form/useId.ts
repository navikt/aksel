import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import ShortUuid from "short-uuid";

const useId = (id?: string): string => {
  const localId = useRef(ShortUuid.generate()).current;
  return id ?? localId;
};

export default useId;
