import { createContext } from "react";

interface DataDragAndDropContextType {
  inputMethod: "mouse" | "keyboard" | null;
}

export const DataDragAndDropContext = createContext<
  DataDragAndDropContextType | undefined
>(undefined);
