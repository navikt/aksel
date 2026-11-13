import { type PointerEvent, useState } from "react";
import { useEventListener } from "../../../utils-external";

/**
 * Tracks whether Shift is held while a button is hovered or focused, so the
 * jump-to-first/last preview only shows on the button it applies to.
 * Shift presses elsewhere on the page are ignored.
 */
function useShiftJumpPreview() {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  const isEngaged = isHovered || isFocused;
  const target = isEngaged && typeof window !== "undefined" ? window : null;

  /*
   * Only a fresh Shift press counts. Otherwise focusing with Shift+Tab would
   * immediately show (and announce) the jump label.
   */
  useEventListener(
    "keydown",
    (event: KeyboardEvent) => {
      if (event.key === "Shift" && !event.repeat) {
        setIsShiftPressed(true);
      }
    },
    target,
  );
  useEventListener(
    "keyup",
    (event: KeyboardEvent) => {
      if (event.key === "Shift") {
        setIsShiftPressed(false);
      }
    },
    target,
  );
  /* keyup never fires if focus leaves the window while Shift is held */
  useEventListener("blur", () => setIsShiftPressed(false), target);

  const syncPointerShift = (event: PointerEvent<HTMLButtonElement>) =>
    setIsShiftPressed(event.shiftKey);

  return {
    isShiftJump: isEngaged && isShiftPressed,
    shiftJumpProps: {
      onPointerEnter: (event: PointerEvent<HTMLButtonElement>) => {
        setIsHovered(true);
        syncPointerShift(event);
      },
      onPointerMove: syncPointerShift,
      onPointerLeave: () => {
        setIsHovered(false);
        if (!isFocused) {
          setIsShiftPressed(false);
        }
      },
      onFocus: () => setIsFocused(true),
      onBlur: () => {
        setIsFocused(false);
        if (!isHovered) {
          setIsShiftPressed(false);
        }
      },
    },
  };
}

export { useShiftJumpPreview };
