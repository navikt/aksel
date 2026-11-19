import { type PointerEvent, useState } from "react";
import { useEventListener } from "../../../utils-external";

/**
 * Tracks whether Shift is held while a button is hovered or focused, so the
 * jump-to-first/last preview only shows on the button it applies to.
 * Tracks modifiers outside the button too, so Shift+Tab can enter with Shift held.
 */
function useShiftJumpPreview() {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  const isEngaged = isHovered || isFocused;
  const syncShift = (event: KeyboardEvent | PointerEvent<HTMLButtonElement>) =>
    setIsShiftPressed(event.shiftKey);

  useEventListener("keydown", syncShift);
  useEventListener("keyup", syncShift);
  /* keyup never fires if focus leaves the window while Shift is held */
  useEventListener("blur", () => setIsShiftPressed(false));

  return {
    isShiftJump: isEngaged && isShiftPressed,
    shiftJumpProps: {
      onPointerEnter: (event: PointerEvent<HTMLButtonElement>) => {
        setIsHovered(true);
        syncShift(event);
      },
      onPointerMove: syncShift,
      onPointerLeave: () => setIsHovered(false),
      onFocus: () => setIsFocused(true),
      onBlur: () => setIsFocused(false),
    },
  };
}

export { useShiftJumpPreview };
