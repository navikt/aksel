import cl from "clsx";
import React, { forwardRef } from "react";
import { BodyShort } from "../../typography/BodyShort";
import { useToggleGroupContext } from "../ToggleGroup.context";
import { useToggleItem } from "./useToggleItem";

export interface ToggleGroupItemProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Content.
   */
  children: React.ReactNode;
  /**
   * Value for state-handling.
   */
  value: string;
}

const ToggleItem = forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  (
    { className, children, value, onClick, onFocus, onKeyDown, ...rest },
    forwardedRef,
  ) => {
    const itemCtx = useToggleItem(
      { value, onClick, onFocus, disabled: false, onKeyDown },
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
        tabIndex={itemCtx.isFocused ? 0 : -1}
        onClick={itemCtx.onClick}
        onFocus={itemCtx.onFocus}
        onKeyDown={itemCtx.onKeyDown}
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
