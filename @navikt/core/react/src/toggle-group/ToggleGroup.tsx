import React, { forwardRef } from "react";
import { useRenameCSS, useThemeInternal } from "../theme/Theme";
import { AkselColor } from "../types";
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
   * @see 🏷️ {@link ToggleGroupProps}
   */
  Root: React.ForwardRefExoticComponent<
    ToggleGroupProps & React.RefAttributes<HTMLDivElement>
  >;
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
    const { cn } = useRenameCSS();
    const themeContext = useThemeInternal(false);
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

    let localVariant: ToggleGroupProps["variant"] | undefined;

    if (themeContext) {
      localVariant = variant;
    } else {
      localVariant = variant ?? "action";
    }

    return (
      <ToggleGroupDescendantsProvider value={descendants}>
        <ToggleGroupProvider {...context}>
          <div
            className={cn("navds-toggle-group__wrapper", className, {
              "navds-toggle-group__wrapper--fill": fill,
            })}
            data-color={color ?? variantToColor(localVariant)}
          >
            {label && (
              <Label
                as="div"
                size={size}
                className={cn("navds-toggle-group__label")}
                id={labelId}
              >
                {label}
              </Label>
            )}
            <div
              aria-labelledby={label ? labelId : undefined}
              {...rest}
              ref={ref}
              className={cn(
                "navds-toggle-group",
                `navds-toggle-group--${size}`,
                { [`navds-toggle-group--${localVariant}`]: localVariant },
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

ToggleGroup.Root = ToggleGroup;
ToggleGroup.Item = ToggleItem;

export default ToggleGroup;
