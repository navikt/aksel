import cl from "clsx";
import React, { forwardRef } from "react";
import { BodyShort } from "../../../typography";
import { OverridableComponent } from "../../../util";
import { useTabsContext } from "../../context";
import { useTab } from "./useTab";

export interface TabProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "children"> {
  /**
   * Tab label
   */
  label?: React.ReactNode;
  /**
   * Tab Icon
   */
  icon?: React.ReactNode;
  /**
   * Value for state-handling
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
          ref={ref}
          {...rest}
          className={cl(
            "navds-tabs__tab",
            `navds-tabs__tab--${ctx?.size ?? "medium"}`,
            `navds-tabs__tab-icon--${ctx?.iconPosition}`,
            className,
            {
              "navds-tabs__tab--icon-only": icon && !label,
            },
          )}
          role="tab"
          type="button"
          aria-selected={tabCtx.isSelected}
          tabIndex={tabCtx.isSelected ? 0 : -1}
          aria-controls={tabCtx.controlsId}
          id={tabCtx.id}
          onFocus={tabCtx.onFocus}
          onOnClick={tabCtx.onClick}
        >
          <BodyShort
            as="span"
            className="navds-tabs__tab-inner"
            size={ctx?.size}
          >
            {icon}
            {label}
          </BodyShort>
        </Component>
      );
    },
  );

export default Tab;
