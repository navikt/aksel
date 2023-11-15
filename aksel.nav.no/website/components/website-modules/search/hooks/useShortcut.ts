import { MutableRefObject, useEffect } from "react";

export const useShortcut = (
  open: boolean,
  setOpen: (value: boolean) => void,
  inputRef: MutableRefObject<HTMLInputElement>
) => {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (
        event.key === "b" &&
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
