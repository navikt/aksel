import React, { useCallback, useEffect } from "react";

export const useEscape = (
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  focusRef: any
) => {
  const handleClose = useCallback(() => {
    setOpen(false);
    focusRef?.current && focusRef.current.focus();
  }, [focusRef, setOpen]);

  const escape = useCallback(
    (e) => open && e.key === "Escape" && handleClose(),
    [handleClose, open]
  );

  useEffect(() => {
    window.addEventListener("keydown", escape, false);

    return () => {
      window.removeEventListener("keydown", escape, false);
    };
  }, [escape]);
};
