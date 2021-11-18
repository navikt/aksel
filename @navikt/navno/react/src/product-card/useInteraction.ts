import { useState } from "react";
import { Interaction } from "./types";

type CardInteractionHandler = (type: Interaction) => void;

interface UseCardState {
  isHovering: boolean;
  isPressed: boolean;
  handlers: { [key: string]: CardInteractionHandler };
}

export const useInteractions = (): UseCardState => {
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const cardInteractionHandler = (type: Interaction): void => {
    if (type === Interaction.mouseenter || type === Interaction.mouseleave) {
      setIsHovering(type === Interaction.mouseenter);
    }

    if (type === Interaction.mouseleave) {
      setIsPressed(false);
    }

    if (type === Interaction.mousedown || type === Interaction.mouseup) {
      setIsPressed(type === Interaction.mousedown);
    }

    if (type === Interaction.touchstart) {
      setIsPressed(true);
    }

    if (type === Interaction.touchend || type === Interaction.touchcancel) {
      setIsPressed(false);
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
  };

  return { isHovering, isPressed, handlers };
};
