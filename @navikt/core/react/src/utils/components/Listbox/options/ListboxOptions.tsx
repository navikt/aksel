/** biome-ignore-all lint/a11y/useKeyWithMouseEvents: We know what we are doing */
import React from "react";
import { cl } from "../../../helpers";
import { useMedia } from "../../../hooks";
import { useListboxContext } from "../root/Listbox.context";

export interface ListboxOptionsProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "role" | "tabIndex" | "onMouseOver"
> {
  children: React.ReactNode;
}

function ListboxOptions({ children, ...rest }: ListboxOptionsProps) {
  const { setVirtuallyFocusedOptionId } = useListboxContext();
  const cannotHover = useMedia("(hover: none)");

  return (
    <div
      {...rest}
      className={cl(rest.className, "aksel-listbox__options")}
      role="listbox"
      tabIndex={-1}
      onMouseOver={(event) => {
        if (cannotHover) {
          // onMouseOver can be triggered by touch, but we don't want virtual focus in that case.
          // We assume you are using touch if the primary input mechanism cannot hover.
          return;
        }
        const target = event.target as HTMLElement;
        const optionEl: HTMLElement | null = target.closest('[role="option"]');
        if (optionEl) {
          setVirtuallyFocusedOptionId(optionEl?.dataset.id || "");
        }
      }}
    >
      {children}
    </div>
  );
}

export { ListboxOptions };
