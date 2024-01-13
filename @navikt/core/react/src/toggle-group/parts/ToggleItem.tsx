import cl from "clsx";
import React, { forwardRef } from "react";
import { BodyShort } from "../../typography/BodyShort";
import { useToggleGroupContext } from "../context";
import { useToggleItem } from "./useToggleItem";

export interface ToggleItemProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Content
   */
  children: React.ReactNode;
  /**
   * Value for state-handling
   */
  value: string;
}

const ToggleItem = forwardRef<HTMLButtonElement, ToggleItemProps>(
  ({ className, children, value, onClick, onFocus, ...rest }, forwardedRef) => {
    const itemCtx = useToggleItem(
      { value, onClick, onFocus, disabled: false },
      forwardedRef,
    );
    const ctx = useToggleGroupContext();

    return (
      <button
        {...rest}
        ref={itemCtx.ref}
        className={cl("navds-toggle-group__button", className)}
        type="button"
        role="radio"
        aria-checked={itemCtx.isSelected}
        tabIndex={itemCtx.isSelected ? 0 : -1}
        onClick={itemCtx.onClick}
        onFocus={itemCtx.onFocus}
      >
        <BodyShort
          as="span"
          className="navds-toggle-group__button-inner"
          size={ctx?.size}
        >
          {children}
        </BodyShort>
      </button>
    );
  },
);

export default ToggleItem;
