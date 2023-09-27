import { useCallback, useEffect, RefObject } from "react";

export const useEscape = (
  open: boolean,
  setOpen: (openState: boolean) => void,
  focusRef: RefObject<HTMLElement>
) => {
  const handleClose = useCallback(() => {
    setOpen(false);
    focusRef?.current && focusRef.current.focus();
  }, [focusRef, setOpen]);

  const escape = useCallback(
    (event: KeyboardEvent) => {
      if (open && event.key === "Escape") {
        event.preventDefault(); // This prevents modal from closing when using datepicker inside modal
        handleClose();
      }
    },
    [handleClose, open]
  );

  useEffect(() => {
    window.addEventListener("keydown", escape, false);

    return () => {
      window.removeEventListener("keydown", escape, false);
    };
  }, [escape]);
};
