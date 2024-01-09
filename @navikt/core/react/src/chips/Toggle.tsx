import cl from "clsx";
import React, { forwardRef } from "react";
import { OverridableComponent } from "../util";

export interface ToggleChipsProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  /**
   * Toggles aria-pressed and visual changes
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
    ref,
  ) => {
    return (
      <Component
        {...rest}
        ref={ref}
        className={cl(
          "navds-chips__chip navds-chips__toggle",
          className,
          `navds-chips__toggle--${variant}`,
          { "navds-chips__toggle--with-checkmark": checkmark },
        )}
        aria-pressed={selected}
      >
        {checkmark && (
          <svg
            aria-hidden
            className="navds-chips__toggle-icon"
            width="1.25em"
            height="1.25em"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            focusable={false}
            role="img"
          >
            {selected ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 18.125C14.4873 18.125 18.125 14.4873 18.125 10C18.125 5.51269 14.4873 1.875 10 1.875C5.51269 1.875 1.875 5.51269 1.875 10C1.875 14.4873 5.51269 18.125 10 18.125ZM14.128 7.72904C14.3695 7.44357 14.3339 7.01635 14.0485 6.7748C13.763 6.53326 13.3358 6.56886 13.0942 6.85432L8.60428 12.1606L6.41627 9.97263C6.15185 9.70822 5.72315 9.70822 5.45873 9.97263C5.19431 10.2371 5.19431 10.6658 5.45873 10.9302L8.16706 13.6385C8.30095 13.7724 8.48479 13.8441 8.67397 13.8362C8.86316 13.8284 9.0404 13.7416 9.16271 13.5971L14.128 7.72904Z"
                fill="currentColor"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 3.125C6.20304 3.125 3.125 6.20304 3.125 10C3.125 13.797 6.20304 16.875 10 16.875C13.797 16.875 16.875 13.797 16.875 10C16.875 6.20304 13.797 3.125 10 3.125ZM1.875 10C1.875 5.51269 5.51269 1.875 10 1.875C14.4873 1.875 18.125 5.51269 18.125 10C18.125 14.4873 14.4873 18.125 10 18.125C5.51269 18.125 1.875 14.4873 1.875 10Z"
                fill="var(--ac-chip-toggle-circle-border, var(--a-border-default))"
              />
            )}
          </svg>
        )}
        <span className="navds-chips__chip-text">{children}</span>
      </Component>
    );
  },
);

export default ToggleChips;
