import React, { useCallback, useEffect } from "react";

export const useOutsideClickHandler = (
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  refs: Array<any>
) => {
  const handleFocusIn = useCallback(
    (e) => {
      const composed = e.composedPath?.()?.[0];
      if (!e?.target || !e?.target?.nodeType || !composed) {
        return;
      }
      !refs.some(
        (element) => element?.contains(e.target) || element?.contains(composed)
      ) &&
        open &&
        setOpen(false);
    },
    [open, refs, setOpen]
  );

  useEffect(() => {
    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("pointerdown", handleFocusIn);
    return () => {
      window?.removeEventListener?.("focusin", handleFocusIn);
      window?.removeEventListener?.("pointerdown", handleFocusIn);
    };
  }, [handleFocusIn]);
};
