import cl from "clsx";
import React, { forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";
import { Label } from "../typography";
import { useId } from "../util";
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
      "aria-describedby": userDescribedby,
      variant = "action",
      fill = false,
      ...rest
    },
    ref,
  ) => {
    const { cn } = useRenameCSS();
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
            className={cn("navds-toggle-group__wrapper", className, {
              "navds-toggle-group__wrapper--fill": fill,
            })}
          >
            {label && (
              <Label
                size={size}
                className={cn("navds-toggle-group__label")}
                id={labelId}
              >
                {label}
              </Label>
            )}
            <div
              {...rest}
              ref={ref}
              className={cn(
                "navds-toggle-group",
                `navds-toggle-group--${size}`,
                `navds-toggle-group--${variant}`,
              )}
              aria-describedby={
                cl(userDescribedby, !!label && labelId) || undefined
              }
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

ToggleGroup.Item = ToggleItem;

export default ToggleGroup;
