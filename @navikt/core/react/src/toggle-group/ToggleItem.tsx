import React, { forwardRef, useContext } from "react";
import cl from "classnames";
import { BodyShort, ToggleGroupContext } from "..";

export interface ToggleItemProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Modal.Content content
   */
  children: React.ReactNode;
  /**
   * Button value to keep track of state
   */
  value: string;
}

export type ToggleItemType = React.ForwardRefExoticComponent<
  ToggleItemProps & React.RefAttributes<HTMLButtonElement>
>;

const ToggleItem: ToggleItemType = forwardRef(
  ({ className, children, value, ...rest }, ref) => {
    const context = useContext(ToggleGroupContext);

    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      context?.handleChange(value);
      rest.onClick && rest.onClick(e);
    };

    return (
      <button
        {...rest}
        ref={ref}
        className={cl("navds-toggle__button", className, {
          "navds-toggle__button--selected": !!context?.value.includes(value),
        })}
        onClick={(e) => handleClick(e)}
        aria-pressed={!!context?.value.includes(value)}
      >
        <BodyShort
          as="span"
          className="navds-toggle__button-inner"
          size={context?.size}
        >
          {children}
        </BodyShort>
      </button>
    );
  }
);

export default ToggleItem;
