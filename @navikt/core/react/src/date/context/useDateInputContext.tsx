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
  /**
   * Flag for enabled-check
   */
  defined: boolean;
}

export const DateContext = createContext<DateContextContextProps | null>(null);

export const useDateInputContext = () => {
  const context = useContext(DateContext);

  if (!context) {
    console.warn("useDateInputContext must be used with DateContext");
  }

  return context;
};
