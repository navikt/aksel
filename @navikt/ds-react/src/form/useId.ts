import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const useId = (id?: string): string => {
  const localId = useRef(uuidv4()).current;
  return id ?? localId;
};

export default useId;
