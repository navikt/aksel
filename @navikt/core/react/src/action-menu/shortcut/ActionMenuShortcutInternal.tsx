import React from "react";
import { ActionMenuMarker } from "../marker/ActionMenuMarkerInternal";

type ShortcutProps = {
  children: string;
};

const ActionMenuShortcut = ({ children }: ShortcutProps) => {
  /**
   * Assumes the user will input either a single keyboard key
   * or keys separated by "+"
   */
  const parsed = children.split("+").filter((str) => str !== "");

  return (
    <ActionMenuMarker placement="right">
      {parsed.map((char) => (
        <span
          key={`${children}-${char}`}
          className="aksel-action-menu__shortcut"
        >
          {char}
        </span>
      ))}
    </ActionMenuMarker>
  );
};

export { ActionMenuShortcut };
export type { ShortcutProps };
