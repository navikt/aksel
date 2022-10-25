import { createContext, useContext } from "react";

interface RowContextProps {
  id: String;
}

export const RowContext = createContext<RowContextProps>({
  id: "",
});

export const useRowContext = () => {
  const context = useContext(RowContext);

  if (!context) {
    console.warn("useRowContext must be used with RowContext");
  }

  return context;
};
