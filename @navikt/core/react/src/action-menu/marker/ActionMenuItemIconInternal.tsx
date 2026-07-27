import React from "react";
import { ActionMenuMarker } from "./ActionMenuMarkerInternal";

type ActionMenuItemIconProps = {
  icon?: React.ReactNode;
  iconPosition: "left" | "right";
};

const ActionMenuItemIcon = ({
  icon,
  iconPosition,
}: ActionMenuItemIconProps) => {
  if (!icon) {
    return null;
  }

  return (
    <ActionMenuMarker
      placement={iconPosition}
      className="aksel-action-menu__marker-icon"
    >
      {icon}
    </ActionMenuMarker>
  );
};

export { ActionMenuItemIcon };
