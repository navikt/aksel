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
   * Connected toggle-button in input
   */
  buttonRef: React.MutableRefObject<HTMLButtonElement | null> | null;
  /**
   * Aria-connected ID
   */
  ariaId?: string;
}

export const DateContext = createContext<DateContextContextProps>({
  open: false,
  onOpen: () => null,
  buttonRef: null,
  ariaId: undefined,
});

export const useDateInputContext = () => {
  const context = useContext(DateContext);

  if (!context) {
    console.warn("useDateInputContext must be used with DateContext");
  }

  return context;
};
