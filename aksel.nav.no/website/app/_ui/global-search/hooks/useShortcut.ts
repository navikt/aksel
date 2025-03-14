import { RefObject, useEffect } from "react";

export const useShortcut = (
  open: boolean,
  setOpen: (value: boolean) => void,
  inputRef: RefObject<HTMLInputElement>,
) => {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (
        (event.key === "k" || event.key === "b") &&
        (event.metaKey || event.ctrlKey) &&
        !event.shiftKey
      ) {
        event.preventDefault();
        if (open) {
          inputRef.current?.focus();
        } else {
          setOpen(true);
        }
      }
    };

    document.addEventListener("keydown", listener);

    return () => document.removeEventListener("keydown", listener);
  }, [inputRef, open, setOpen]);
};
