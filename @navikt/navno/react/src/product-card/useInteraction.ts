import { useState, SyntheticEvent } from "react";
import { Interaction } from "./types";

type CardInteractionHandler = (event: SyntheticEvent) => void;

interface UseCardState {
  isHovering: boolean;
  isActive: boolean;
  isFocused: boolean;
  handlers: { [key: string]: CardInteractionHandler };
}

export const useInteractions = (): UseCardState => {
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const cardInteractionHandler = (event: SyntheticEvent): void => {
    const { type } = event;
    console.log(event);
    if (type === Interaction.mouseenter || type === Interaction.mouseleave) {
      setIsHovering(type === Interaction.mouseenter);
    }

    if (type === Interaction.mouseleave) {
      setIsActive(false);
    }

    if (type === Interaction.mousedown || type === Interaction.mouseup) {
      setIsActive(type === Interaction.mousedown);
    }

    if (type === Interaction.touchstart) {
      setIsActive(true);
    }

    if (type === Interaction.touchend || type === Interaction.touchcancel) {
      setIsActive(false);
    }

    if (type === Interaction.focus) {
      setIsFocused(true);
    }

    if (type === Interaction.blur) {
      setIsFocused(false);
    }
  };

  const handlers = {
    onMouseEnter: cardInteractionHandler,
    onMouseLeave: cardInteractionHandler,
    onMouseDown: cardInteractionHandler,
    onMouseUp: cardInteractionHandler,
    onTouchStart: cardInteractionHandler,
    onTouchEnd: cardInteractionHandler,
    onTouchCancel: cardInteractionHandler,
    onTouchMove: cardInteractionHandler,
    onFocus: cardInteractionHandler,
    onBlur: cardInteractionHandler,
  };

  return { isHovering, isActive, isFocused, handlers };
};
