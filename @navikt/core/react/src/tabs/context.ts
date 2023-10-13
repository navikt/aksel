import { createContext } from "react";

interface TabsContextProps {
  size: "medium" | "small";
  loop: boolean;
  iconPosition: "left" | "top";
}

export const TabsContext = createContext<TabsContextProps | null>(null);
