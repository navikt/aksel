import React, { forwardRef } from "react";
import { BodyShort } from "../../typography/BodyShort";
import { cl } from "../../util/className";
import { useToggleGroupContext } from "../ToggleGroup.context";
import { useToggleItem } from "./useToggleItem";

type BaseProps = Omit<React.HTMLAttributes<HTMLButtonElement>, "children"> & {
  /**
   * Value for state-handling.
   */
  value: string;
};

type ChildrenProps = {
  /**
   * @deprecated Use `label` and/or `icon` as replacement.
   */
  children: React.ReactNode;
  label?: never;
  icon?: never;
};

type LabelProps = {
  children?: never;
  /**
   * Item label.
   */
  label: React.ReactNode;
  /**
   * Item Icon.
   */
  icon?: React.ReactNode;
};

type IconProps = {
  children?: never;
  /**
   * Item label.
   */
  label?: React.ReactNode;
  /**
   * Item Icon.
   */
  icon: React.ReactNode;
};

export type ToggleGroupItemProps = BaseProps &
  (ChildrenProps | LabelProps | IconProps);

const ToggleItem = forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  (
    {
      className,
      children,
      icon,
      label,
      value,
      onClick,
      onFocus,
      onKeyDown,
      ...rest
    },
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
        className={cl("aksel-toggle-group__button", className)}
        type="button"
        role="radio"
        aria-checked={itemCtx.isSelected}
        data-selected={itemCtx.isSelected}
        tabIndex={itemCtx.isFocused ? 0 : -1}
        onClick={itemCtx.onClick}
        onFocus={itemCtx.onFocus}
        onKeyDown={itemCtx.onKeyDown}
      >
        <BodyShort
          as="span"
          className="aksel-toggle-group__button-inner"
          size={ctx?.size}
        >
          {children ?? (
            <>
              {icon}
              {label}
            </>
          )}
        </BodyShort>
      </button>
    );
  },
);

export default ToggleItem;
