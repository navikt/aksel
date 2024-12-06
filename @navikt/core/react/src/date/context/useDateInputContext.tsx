import { createContext, useContext } from "react";

interface DateInputContextProps {
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

export const DateInputContext = createContext<DateInputContextProps | null>(
  null,
);

export const useDateInputContext = () => {
  const context = useContext(DateInputContext);

  if (!context) {
    console.warn("useDateInputContext must be used with DateInputContext");
  }

  return context;
};
