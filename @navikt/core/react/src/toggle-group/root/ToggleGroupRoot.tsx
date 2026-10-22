import React, { forwardRef } from "react";
import type { AkselColor } from "../../types";
import { Label } from "../../typography";
import { useId } from "../../utils-external";
import { cl } from "../../utils/helpers";
import type { ToggleGroupProps } from "../ToggleGroup.types";
import {
  ToggleGroupItem,
  type ToggleGroupItemProps,
} from "../item/ToggleGroupItem";
import { ToggleGroupProvider } from "./ToggleGroupRoot.context";
import { useToggleGroup } from "./useToggleGroup";

const ToggleGroupRoot = forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    {
      className,
      children,
      onChange,
      size = "medium",
      label,
      value,
      defaultValue,
      variant,
      fill = false,
      "data-color": color,
      ...rest
    },
    ref,
  ) => {
    const toggleGroupContext = useToggleGroup({
      defaultValue,
      value,
      onChange,
    });

    /**
     * ToggleGroupProvider handles memoization.
     */
    const context = {
      ...toggleGroupContext,
      size,
    };

    const labelId = useId();

    const labelSize = size === "xsmall" ? "small" : size;

    if (!value && !defaultValue) {
      console.error("ToggleGroup without value or defaultvalue is not allowed");
    }

    if (!value && !defaultValue) {
      console.error("ToggleGroup needs either a value or defaultValue");
    }

    return (
      <ToggleGroupProvider {...context}>
        <div
          className={cl("aksel-toggle-group__wrapper", className, {
            "aksel-toggle-group__wrapper--fill": fill,
          })}
          data-color={color ?? variantToColor(variant)}
        >
          {label && (
            <Label
              as="div"
              size={labelSize}
              className="aksel-toggle-group__label"
              id={labelId}
            >
              {label}
            </Label>
          )}
          <div
            aria-labelledby={label ? labelId : undefined}
            {...rest}
            ref={ref}
            className={cl("aksel-toggle-group", `aksel-toggle-group--${size}`)}
            role="radiogroup"
            data-aksel-toggle-group
          >
            {children}
          </div>
        </div>
      </ToggleGroupProvider>
    );
  },
);

function variantToColor(
  variant?: ToggleGroupProps["variant"],
): AkselColor | undefined {
  switch (variant) {
    case "action":
      return "accent";
    case "neutral":
      return "neutral";
    default:
      return undefined;
  }
}

/**
 * A component that displays a group of toggle buttons.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/toggle-group)
 * @see 🏷️ {@link ToggleGroupProps}
 *
 * @example
 * ```jsx
 * <ToggleGroup defaultValue="lest" onChange={console.log} size="small">
 *   <ToggleGroup.Item value="ulest" label="Ulest" />
 *   <ToggleGroup.Item value="lest" label="Leste" />
 *   <ToggleGroup.Item value="sendt" label="Sendt" />
 * </ToggleGroup>
 * ```
 */
const ToggleGroup = Object.assign(ToggleGroupRoot, {
  /**
   * @see 🏷️ {@link ToggleGroupItemProps}
   */
  Item: ToggleGroupItem,
});

export { ToggleGroup, ToggleGroupItem };
export type { ToggleGroupProps, ToggleGroupItemProps };
