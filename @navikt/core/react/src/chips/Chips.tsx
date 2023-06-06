import cl from "clsx";
import React, { forwardRef, HTMLAttributes } from "react";
import ToggleChips, { ToggleChipsType } from "./Toggle";
import RemovableChips, { RemovableChipsType } from "./Removable";

export interface ChipsProps extends HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
  /**
   * Changes padding and font-sizes
   * @default "medium"
   */
  size?: "medium" | "small";
}

interface ChipsComponent
  extends React.ForwardRefExoticComponent<
    ChipsProps & React.RefAttributes<HTMLUListElement>
  > {
  Toggle: ToggleChipsType;
  Removable: RemovableChipsType;
}

/**
 * A component that displays a list of items as chips.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/chips)
 * @see 🏷️ {@link ChipsProps}
 *
 * @example
 * ```jsx
      <Chips size="small">
        {options.map((c) => (
          <Chips.Toggle
            selected={selected.includes(c)}
            key={c}
            onClick={() =>
              setSelected(
                selected.includes(c)
                  ? selected.filter((x) => x !== c)
                  : [...selected, c]
              )
            }
          >
            {c}
          </Chips.Toggle>
        ))}
      </Chips>
 * ```
 */
export const Chips: ChipsComponent = forwardRef<HTMLUListElement, ChipsProps>(
  ({ className, size = "medium", children, ...rest }, ref) => {
    return (
      <ul
        {...rest}
        ref={ref}
        className={cl("navds-chips", className, `navds-chips--${size}`, {
          "navds-body-short navds-body-short--small": size === "medium",
          "navds-detail navds-detail--small": size === "small",
        })}
      >
        {React.Children.map(children, (chip, index) => {
          return <li key={index + (chip?.toString() ?? "")}>{chip}</li>;
        })}
      </ul>
    );
  }
) as ChipsComponent;

Chips.Toggle = ToggleChips;
Chips.Removable = RemovableChips;

export default Chips;
