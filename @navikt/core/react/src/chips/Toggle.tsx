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
  /**
   * Chip-variants
   * @default "action"
   */
  variant?: "action" | "neutral";
  /**
   * Toggles display of checkmark on selected
   * @default true
   */
  checkmark?: boolean;
}

export const ToggleChips: OverridableComponent<
  ToggleChipsProps,
  HTMLButtonElement
> = forwardRef(
  (
    {
      className,
      children,
      selected,
      variant = "action",
      checkmark = true,
      as: Component = "button",
      ...rest
    },
    ref
  ) => {
    return (
      <Component
        {...rest}
        ref={ref}
        className={cl(
          "navds-chips__chip navds-chips__toggle",
          className,
          `navds-chips__toggle--${variant}`
        )}
        aria-pressed={selected}
      >
        {selected && checkmark && (
          <svg
            aria-hidden
            className="navds-chips__toggle-icon"
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            focusable={false}
            role="img"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.51894 0.45851C9.81799 0.745107 9.8281 1.21987 9.5415 1.51893L3.7915 7.51893C3.51247 7.81009 3.05315 7.82848 2.75174 7.56056L0.501735 5.56056C0.192148 5.28537 0.164263 4.81132 0.439451 4.50173C0.71464 4.19214 1.18869 4.16426 1.49828 4.43944L3.20835 5.95951L8.45852 0.481072C8.74511 0.182015 9.21988 0.171913 9.51894 0.45851Z"
              fill="currentColor"
            />
          </svg>
        )}
        <span className="navds-chips__chip-text">{children}</span>
      </Component>
    );
  }
);

export default ToggleChips;
