import { createContext } from "react";

interface DragAndDropContextLegacyType {
  inputMethod: "mouse" | "keyboard" | null;
  // setInputMethod: (method: "mouse" | "keyboard" | null) => void;
  // setItems: React.Dispatch<React.SetStateAction<any[]>>;
}

export const DragAndDropLegacyContext = createContext<
  DragAndDropContextLegacyType | undefined
>(undefined);
