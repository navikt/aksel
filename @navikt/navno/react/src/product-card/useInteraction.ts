import { useState } from "react";
import { Interaction } from "./types";

type CardInteractionHandler = (event: MouseEvent) => void;

interface UseCardState {
  isHovering: boolean;
  isActive: boolean;
  handlers: { [key: string]: CardInteractionHandler };
}

export const useInteractions = (): UseCardState => {
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const cardInteractionHandler = (event: MouseEvent): void => {
    const { type } = event;
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

  return { isHovering, isActive, handlers };
};
