import cl from "clsx";
import React, { forwardRef } from "react";
import { BodyShort } from "../../../typography";
import { OverridableComponent } from "../../../util";
import { useTabsContext } from "../../Tabs.context";
import { useTab } from "./useTab";

export interface TabProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "children"> {
  /**
   * Tab label.
   */
  label?: React.ReactNode;
  /**
   * Tab Icon.
   */
  icon?: React.ReactNode;
  /**
   * Value for state-handling.
   */
  value: string;
}

export const Tab: OverridableComponent<TabProps, HTMLButtonElement> =
  forwardRef(
    (
      {
        className,
        as: Component = "button",
        label,
        icon,
        value,
        onClick,
        onFocus,
        disabled,
        ...rest
      },
      ref: React.ForwardedRef<HTMLButtonElement>,
    ) => {
      const tabCtx = useTab({ value, onClick, onFocus, disabled }, ref);
      const ctx = useTabsContext();

      if (!label && !icon) {
        console.error("<Tabs.Tab/> needs label and/or icon");
        return null;
      }

      return (
        <Component
          ref={tabCtx.ref}
          {...rest}
          className={cl(
            "navds-tabs__tab",
            `navds-tabs__tab--${ctx?.size ?? "medium"}`,
            `navds-tabs__tab-icon--${ctx?.iconPosition}`,
            className,
            {
              "navds-tabs__tab--icon-only": icon && !label,
              "navds-tabs__tab--fill": ctx.fill,
            },
          )}
          role="tab"
          type="button"
          aria-selected={tabCtx.isSelected}
          data-state={tabCtx.isSelected ? "active" : "inactive"}
          tabIndex={tabCtx.isFocused ? 0 : -1}
          aria-controls={tabCtx.controlsId}
          id={tabCtx.id}
          onFocus={tabCtx.onFocus}
          onClick={tabCtx.onClick}
        >
          <BodyShort
            as="span"
            className="navds-tabs__tab-inner"
            size={ctx?.size}
          >
            <span aria-hidden={!!label}>{icon}</span>
            <span>{label}</span>
          </BodyShort>
        </Component>
      );
    },
  );

export default Tab;
