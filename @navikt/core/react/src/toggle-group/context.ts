import { createContext } from "react";

interface ToggleContextProps {
  size: "medium" | "small";
}

export const ToggleGroupContext = createContext<ToggleContextProps | null>(
  null
);
