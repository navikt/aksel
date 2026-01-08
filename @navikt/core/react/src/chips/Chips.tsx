import React, { HTMLAttributes, forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";
import { OverridableComponent } from "../util/types";
import RemovableChips, { ChipsRemovableProps } from "./Removable";
import ToggleChips, { ChipsToggleProps } from "./Toggle";

export interface ChipsProps extends HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
  /**
   * Changes padding and font-sizes.
   * @default "medium"
   */
  size?: "medium" | "small";
}

interface ChipsComponent
  extends React.ForwardRefExoticComponent<
    ChipsProps & React.RefAttributes<HTMLUListElement>
  > {
  /**
   * Toggle between selected-states.
   * @see 🏷️ {@link ToggleChipsProps}
   * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
   */
  Toggle: OverridableComponent<ChipsToggleProps, HTMLButtonElement>;
  /**
   * Remove filter or the likes on click.
   * @see 🏷️ {@link RemovableChipsProps}
   * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
   */
  Removable: OverridableComponent<ChipsRemovableProps, HTMLButtonElement>;
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
export const Chips: ChipsComponent = forwardRef<HTMLUListElement, ChipsProps>(
  ({ className, size = "medium", children, ...rest }, ref) => {
    const { cn } = useRenameCSS();
    return (
      <ul
        {...rest}
        ref={ref}
        className={cn("navds-chips", className, `navds-chips--${size}`, {
          "navds-body-short navds-body-short--small": size === "medium",
          "navds-detail navds-detail--small": size === "small",
        })}
      >
        {React.Children.map(children, (chip, index) => {
          return <li key={chip?.toString() || index}>{chip}</li>;
        })}
      </ul>
    );
  },
) as ChipsComponent;

Chips.Toggle = ToggleChips;
Chips.Removable = RemovableChips;

export default Chips;
