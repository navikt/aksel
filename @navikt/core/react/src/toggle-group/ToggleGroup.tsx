import React, { forwardRef } from "react";
import { AkselColor } from "../types";
import { Label } from "../typography";
import { useId } from "../utils-external";
import { cl } from "../utils/helpers";
import {
  ToggleGroupDescendantsProvider,
  ToggleGroupProvider,
  useToggleGroupDescendants,
} from "./ToggleGroup.context";
import { ToggleGroupProps } from "./ToggleGroup.types";
import ToggleItem from "./parts/ToggleItem";
import { useToggleGroup } from "./useToggleGroup";

interface ToggleGroupComponent
  extends React.ForwardRefExoticComponent<
    ToggleGroupProps & React.RefAttributes<HTMLDivElement>
  > {
  /**
   * @see 🏷️ {@link ToggleItem}
   */
  Item: typeof ToggleItem;
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
export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
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
    const descendants = useToggleGroupDescendants();

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

    if (!value && !defaultValue) {
      console.error("ToggleGroup without value or defaultvalue is not allowed");
    }

    if (!value && !defaultValue) {
      console.error("ToggleGroup needs either a value or defaultValue");
    }

    return (
      <ToggleGroupDescendantsProvider value={descendants}>
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
                size={size}
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
              className={cl(
                "aksel-toggle-group",
                `aksel-toggle-group--${size}`,
              )}
              role="radiogroup"
            >
              {children}
            </div>
          </div>
        </ToggleGroupProvider>
      </ToggleGroupDescendantsProvider>
    );
  },
) as ToggleGroupComponent;

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

ToggleGroup.Item = ToggleItem;

export default ToggleGroup;
