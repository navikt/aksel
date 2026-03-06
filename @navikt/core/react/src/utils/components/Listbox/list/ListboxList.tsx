/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/** biome-ignore-all lint/a11y/useKeyWithMouseEvents: We know what we are doing */
import React from "react";
import { cl } from "../../../helpers";

export interface ListboxListProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "role" | "tabIndex" | "onMouseOver"
> {
  children: React.ReactNode;
  setVirtuallyFocusedItemId: (value: string) => void;
}

function ListboxList({
  children,
  setVirtuallyFocusedItemId,
  ...rest
}: ListboxListProps) {
  return (
    <div
      {...rest}
      className={cl(rest.className, "aksel-listbox__list")}
      role="listbox"
      tabIndex={-1}
      onMouseOver={(event) => {
        const target = event.target as HTMLElement;
        const itemEl: HTMLElement | null = target.closest('[role="option"]');
        if (itemEl) {
          setVirtuallyFocusedItemId(itemEl?.dataset.id || "");
        }
      }}
    >
      {children}
    </div>
  );
}

export { ListboxList };
