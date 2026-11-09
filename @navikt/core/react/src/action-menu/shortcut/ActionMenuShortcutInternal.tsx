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
      {parsed.map((char, index) => (
        <span
          // oxlint-disable-next-line react/no-array-index-key -- This is a static list of characters, so using the index as a key is acceptable in this case
          key={`${children}-${index}-${char}`}
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
