import { createContext } from "react";

interface DataDragAndDropContextType {
  inputMethod: "mouse" | "keyboard" | null;
  // setInputMethod: (method: "mouse" | "keyboard" | null) => void;
  // setItems: React.Dispatch<React.SetStateAction<any[]>>;
}

export const DataDragAndDropContext = createContext<
  DataDragAndDropContextType | undefined
>(undefined);
