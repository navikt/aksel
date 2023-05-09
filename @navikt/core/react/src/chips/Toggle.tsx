import { CheckmarkIcon } from "@navikt/aksel-icons";
import cl from "clsx";
import React, { forwardRef } from "react";
import { OverridableComponent } from "../util/OverridableComponent";

export interface ToggleChipsProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  /**
   * Toggles aria-pressed and visual-changes
   */
  selected?: boolean;
}

export interface ToggleChipsType
  extends OverridableComponent<ToggleChipsProps, HTMLButtonElement> {}

export const ToggleChips: ToggleChipsType = forwardRef(
  (
    { className, children, selected, as: Component = "button", ...rest },
    ref
  ) => {
    return (
      <Component
        {...rest}
        ref={ref}
        className={cl("navds-chips__chip navds-chips__toggle", className, {
          "navds-chips--icon-left": selected,
        })}
        aria-pressed={selected}
      >
        {selected && (
          <CheckmarkIcon aria-hidden className="navds-chips__toggle-icon" />
        )}
        <span className="navds-chips__chip-text">{children}</span>
      </Component>
    );
  }
);

export default ToggleChips;
