import React, { type MouseEvent } from "react";
import { cl } from "../../../helpers";

export type ListboxOptionProps<T> = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "role" | "tabIndex" | "onClick"
> & {
  /**
   * Unique ID used for tracking which option has virtual focus.
   */
  id: string;
  /**
   * Whether the option currently has virtual focus. Based on the value from
   * `setVirtuallyFocusedOptionId`, usually `virtuallyFocusedOptionId === id`.
   *
   * (This check has to be done outside the component to avoid unnecessary
   * re-renders each time `virtuallyFocusedOptionId` changes.)
   */
  hasVirtualFocus: boolean;
  /**
   * Unique ID of the Listbox instance.
   * Used to generate an ID for the option that currently has virtual focus.
   */
  listboxId: string;
  children: React.ReactNode;
} & (T extends undefined
    ? {
        /**
         * Callback when option is selected. Use a stable reference for better performance.
         */
        onClick: (event: MouseEvent<HTMLDivElement>) => void;
        /**
         * Optional parameter to pass to the onClick callback.
         * Use a stable reference for better performance.
         */
        onClickParam?: undefined;
      }
    : {
        /**
         * Callback when option is selected. Use a stable reference for better performance.
         */
        onClick: (event: MouseEvent<HTMLDivElement>, param: T) => void;
        /**
         * Optional parameter to pass to the onClick callback.
         * Use a stable reference for better performance.
         */
        onClickParam: T;
      });

function ListboxOptionComponent<T = undefined>({
  id,
  hasVirtualFocus,
  listboxId,
  children,
  className,
  onClick,
  onClickParam,
  ...rest
}: ListboxOptionProps<T>) {
  //console.log(Date.now(), "Rendering option", id); // eslint-disable-line react-hooks/purity

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      aria-selected={false}
      {...rest}
      onClick={
        onClickParam === undefined
          ? (onClick as (event: MouseEvent<HTMLDivElement>) => void)
          : (event) => onClick(event, onClickParam)
      }
      className={cl("aksel-listbox__option", className)}
      role="option"
      tabIndex={-1}
      data-virtual-focus={hasVirtualFocus}
      data-id={id}
      id={hasVirtualFocus ? `aksel-listbox-${listboxId}-active` : undefined}
    >
      {children}
    </div>
  );
}

/**
 * This component is memoized. To improve performance when you have many options,
 * make sure all non-primitive props have stable references.
 *
 * NB: Remember to set `aria-selected` on selected options!
 */
export const ListboxOption = React.memo(
  ListboxOptionComponent,
  /*(prevProps, nextProps) => {
    const changedProps = Object.keys(prevProps).filter(
      (key) => prevProps[key] !== nextProps[key],
    );
    if (changedProps.length > 0) {
      console.log(
        Date.now(),
        "ListboxOption rerendered. Changed props:",
        changedProps,
        "- Option ID:",
        prevProps.id,
      );
    }
    return changedProps.length === 0;
  },*/
) as typeof ListboxOptionComponent;
