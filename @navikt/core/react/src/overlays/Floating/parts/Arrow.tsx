import React from "react";
import { useFloatingContentContext } from "../Floating.context";
import { Side } from "../Floating.types";

const OPPOSITE_SIDE: Record<Side, Side> = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right",
};

interface FloatingArrowProps {
  className?: string;
  width?: number;
  height?: number;
}

export const FloatingArrow = ({
  width,
  height,
  className,
}: FloatingArrowProps) => {
  const context = useFloatingContentContext();

  const side = OPPOSITE_SIDE[context.placedSide];

  return (
    <span
      ref={context.onArrowChange}
      style={{
        position: "absolute",
        left: context.arrowX,
        top: context.arrowY,
        [side]: 0,
        transformOrigin: {
          top: "",
          right: "0 0",
          bottom: "center 0",
          left: "100% 0",
        }[context.placedSide],
        transform: {
          top: "translateY(100%)",
          right: "translateY(50%) rotate(90deg) translateX(-50%)",
          bottom: `rotate(180deg)`,
          left: "translateY(50%) rotate(-90deg) translateX(50%)",
        }[context.placedSide],
        visibility: context.hideArrow ? "hidden" : undefined,
      }}
      aria-hidden
    >
      <svg
        className={className}
        width={width}
        height={height}
        viewBox="0 0 30 10"
        preserveAspectRatio="none"
        style={{ display: "block" }}
      >
        <polygon points="0,0 30,0 15,10" />
      </svg>
    </span>
  );
};
