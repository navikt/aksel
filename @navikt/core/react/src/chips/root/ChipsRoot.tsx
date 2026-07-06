import React, { type HTMLAttributes, forwardRef } from "react";
import { cl } from "../../utils/helpers";
import { ChipsRemovable } from "../removable/ChipsRemovable";
import { ChipsToggle } from "../toggle/ChipsToggle";

interface ChipsProps extends HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
  /**
   * Changes padding and font-sizes.
   * @default "medium"
   */
  size?: "medium" | "small";
}

interface ChipsComponent extends React.ForwardRefExoticComponent<
  ChipsProps & React.RefAttributes<HTMLUListElement>
> {
  /**
   * Toggle between selected-states.
   * @see 🏷️ {@link ToggleChipsProps}
   * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
   */
  Toggle: typeof ChipsToggle;
  /**
   * Remove filter or the likes on click.
   * @see 🏷️ {@link RemovableChipsProps}
   * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
   */
  Removable: typeof ChipsRemovable;
}

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
export const Chips = forwardRef<HTMLUListElement, ChipsProps>(
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
) as ChipsComponent;

Chips.Toggle = ChipsToggle;
Chips.Removable = ChipsRemovable;

export default Chips;
export type { ChipsProps };
