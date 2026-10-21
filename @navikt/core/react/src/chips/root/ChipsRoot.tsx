import React, { type HTMLAttributes, forwardRef } from "react";
import { cl } from "../../utils/helpers";
import {
  ChipsRemovable,
  type ChipsRemovableProps,
} from "../removable/ChipsRemovable";
import { ChipsToggle, type ChipsToggleProps } from "../toggle/ChipsToggle";

interface ChipsProps extends HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
  /**
   * Changes padding and font-sizes.
   * @default "medium"
   */
  size?: "medium" | "small";
}

const ChipsRoot = forwardRef<HTMLUListElement, ChipsProps>(
  ({ className, size = "medium", children, ...rest }, ref) => {
    return (
      <ul
        {...rest}
        ref={ref}
        className={cl("aksel-chips", className, `aksel-chips--${size}`, {
          "aksel-body-short aksel-body-short--small": size === "medium",
          "aksel-detail aksel-detail--small": size === "small",
        })}
      >
        {React.Children.map(children, (chip, index) => {
          return <li key={chip?.toString() || index}>{chip}</li>;
        })}
      </ul>
    );
  },
);

/**
 * A component that displays a list of items as chips.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/chips)
 * @see 🏷️ {@link ChipsProps}
 *
 * @example
 * ```jsx
 *    <Chips size="small">
 *      {options.map((c) => (
 *        <Chips.Toggle
 *          selected={selected.includes(c)}
 *          key={c}
 *          onClick={() =>
 *            setSelected(
 *              selected.includes(c)
 *                ? selected.filter((x) => x !== c)
 *                : [...selected, c]
 *            )
 *          }
 *        >
 *          {c}
 *        </Chips.Toggle>
 *      ))}
 *    </Chips>
 * ```
 */
const Chips = Object.assign(ChipsRoot, {
  /**
   * Toggle between selected-states.
   * @see 🏷️ {@link ChipsToggleProps}
   * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
   */
  Toggle: ChipsToggle,
  /**
   * Remove filter or the likes on click.
   * @see 🏷️ {@link ChipsRemovableProps}
   * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
   */
  Removable: ChipsRemovable,
});

export { Chips, ChipsRemovable, ChipsToggle };
export type { ChipsProps, ChipsRemovableProps, ChipsToggleProps };
