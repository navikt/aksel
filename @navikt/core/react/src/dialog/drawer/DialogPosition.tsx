import React, { type ComponentProps } from "react";
import { BoxNew } from "../../../layout/box";

type Positions = "center" | "left" | "right" | "bottom" | "fullscreen";

type OverlayPositionProp =
  | Positions
  | {
      xs: Positions;
      sm: Positions;
      md: Positions;
      lg: Positions;
      xl: Positions;
      "2xl": Positions;
    };

type OverlayPositionProps = {
  children: React.ReactElement;
  position: OverlayPositionProp;
};

function OverlayPosition({ position, ...restProps }: OverlayPositionProps) {
  const borderRadius =
    typeof position === "string"
      ? borderRadiusFromPosition(position)
      : Object.fromEntries(
          Object.entries(position).map(([key, value]) => {
            return [key, borderRadiusFromPosition(value)];
          }),
        );

  const height =
    typeof position === "string"
      ? heightFromPosition(position)
      : Object.fromEntries(
          Object.entries(position).map(([key, value]) => {
            return [key, heightFromPosition(value)];
          }),
        );

  return (
    <BoxNew
      {...restProps}
      borderRadius={borderRadius}
      height={height}
      asChild
    />
  );
}

function borderRadiusFromPosition(
  position: Positions,
): ComponentProps<typeof BoxNew>["borderRadius"] {
  switch (position) {
    case "center":
      return "12 12 12 12";
    case "left":
      return "0 12 12 0";
    case "right":
      return "12 0 0 12";
    case "bottom":
      return "12 12 0 0";
    case "fullscreen":
      return "0";
    default:
      return undefined;
  }
}

function heightFromPosition(
  position: Positions,
): ComponentProps<typeof BoxNew>["height"] {
  switch (position) {
    case "center":
      return "auto";
    case "left":
    case "right":
      return "100dvh";
    case "bottom":
      return "auto";
    case "fullscreen":
      return "100%";
    default:
      return undefined;
  }
}

export { OverlayPosition };
export type { OverlayPositionProp };
