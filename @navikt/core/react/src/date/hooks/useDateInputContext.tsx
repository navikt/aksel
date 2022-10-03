import { createContext, useContext } from "react";

interface DateContextContextProps {
  open: boolean;
  onOpen: () => void;
  buttonRef: React.MutableRefObject<HTMLButtonElement | null> | null;
  ariaId?: string;
}

export const DateContext = createContext<DateContextContextProps>({
  open: false,
  onOpen: () => null,
  buttonRef: null,
  ariaId: undefined,
});

export const useDateInputContext = () => useContext(DateContext);
