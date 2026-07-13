import React from "react";
import { cl } from "../../utils/helpers";

type MarkerProps = {
  children: React.ReactNode;
  className?: string;
  placement: "left" | "right";
};

const ActionMenuMarker = ({ children, className, placement }: MarkerProps) => {
  return (
    <div
      aria-hidden
      className={cl(
        className,
        "aksel-action-menu__marker",
        `aksel-action-menu__marker--${placement}`,
      )}
    >
      {children}
    </div>
  );
};

export { ActionMenuMarker };
export type { MarkerProps };
