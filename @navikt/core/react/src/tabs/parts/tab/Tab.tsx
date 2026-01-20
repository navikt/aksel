import React, { forwardRef } from "react";
import { BodyShort } from "../../../typography";
import type { OverridableComponent } from "../../../utils-external";
import { cl } from "../../../utils/helpers";
import { useTabsContext } from "../../Tabs.context";
import { useTab } from "./useTab";

export interface TabProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
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
  /**
   * Overrides auto-generated id.
   *
   * **Warning**: Tab generates an id if not provided. If you need to override it,
   * make sure to also include the correct `aria-controls` id for the TabPanel it controls.
   */
  id?: string;
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
        id,
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
            "aksel-tabs__tab",
            `aksel-tabs__tab--${ctx?.size ?? "medium"}`,
            `aksel-tabs__tab-icon--${ctx?.iconPosition}`,
            className,
            {
              "aksel-tabs__tab--icon-only": icon && !label,
              "aksel-tabs__tab--fill": ctx.fill,
            },
          )}
          role="tab"
          type="button"
          aria-selected={tabCtx.isSelected}
          data-state={tabCtx.isSelected ? "active" : "inactive"}
          tabIndex={tabCtx.isFocused ? 0 : -1}
          aria-controls={rest["aria-controls"] ?? tabCtx.controlsId}
          id={id ?? tabCtx.id}
          onFocus={tabCtx.onFocus}
          onClick={tabCtx.onClick}
        >
          <BodyShort
            as="span"
            className="aksel-tabs__tab-inner"
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
