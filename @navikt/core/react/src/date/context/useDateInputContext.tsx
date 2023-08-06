import { createContext, useContext } from "react";

interface DateContextContextProps {
  /**
   * Open state for popover
   */
  open: boolean;
  /**
   * Callback for opOpen toggle
   */
  onOpen: () => void;
  /**
   * Aria-connected ID
   */
  ariaId?: string;
}

export const DateContext = createContext<DateContextContextProps>({
  open: false,
  onOpen: () => null,
  ariaId: undefined,
});

export const useDateInputContext = () => {
  const context = useContext(DateContext);

  if (!context) {
    console.warn("useDateInputContext must be used with DateContext");
  }

  return context;
};
