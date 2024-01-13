/* eslint-disable jsx-a11y/interactive-supports-focus */
import cl from "clsx";
import React, { forwardRef, useMemo } from "react";
import { Label } from "../typography";
import { useId } from "../util";
import {
  ToggleGroupDescendantsProvider,
  ToggleGroupProvider,
  useToggleGroupDescendants,
} from "./context";
import ToggleItem from "./parts/ToggleItem";
import { ToggleGroupProps } from "./types";
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
 *   <ToggleGroup.Item value="ulest">Ulest</ToggleGroup.Item>
 *   <ToggleGroup.Item value="lest">Leste</ToggleGroup.Item>
 *   <ToggleGroup.Item value="sendt">Sendt</ToggleGroup.Item>
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
      "aria-describedby": desc,
      variant = "action",
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

    const context = useMemo(
      () => ({
        ...toggleGroupContext,
        size,
      }),
      [size, toggleGroupContext],
    );

    const labelId = useId();

    if (!value && !defaultValue) {
      console.error("ToggleGroup without value or defaultvalue is not allowed");
    }

    const describeBy = cl({
      [desc ?? ""]: !!desc,
      [labelId ?? ""]: !!label,
    });

    if (!value && !defaultValue) {
      console.error("ToggleGroup needs either a value or defaultValue");
    }

    return (
      <ToggleGroupDescendantsProvider value={descendants}>
        <ToggleGroupProvider value={context}>
          <div className={cl("navds-toggle-group__wrapper", className)}>
            {label && (
              <Label
                size={size}
                className="navds-toggle-group__label"
                id={labelId}
              >
                {label}
              </Label>
            )}
            <div
              {...rest}
              ref={ref}
              className={cl(
                "navds-toggle-group",
                `navds-toggle-group--${size}`,
                `navds-toggle-group--${variant}`,
              )}
              {...(describeBy && { "aria-describedby": describeBy })}
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
