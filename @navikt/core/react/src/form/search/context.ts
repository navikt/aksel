import { createContext } from "react";

export interface SearchContextProps {
  disabled?: boolean;
  size: "medium" | "small";
  variant: "primary" | "secondary" | "simple";
  handleClick: () => void;
}

export const SearchContext = createContext<SearchContextProps | null>(null);
