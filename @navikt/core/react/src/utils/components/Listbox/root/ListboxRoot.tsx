/** biome-ignore-all lint/a11y/noStaticElementInteractions: We know what we are doing */
import React, { forwardRef } from "react";
import { useId } from "../../../../utils-external";
import { cl } from "../../../helpers";
import { ListboxGroup } from "../group/ListboxGroup";
import { ListboxInputSlot } from "../input-slot/ListboxInputSlot";
import { ListboxOption } from "../option/ListboxOption";
import { ListboxOptions } from "../options/ListboxOptions";
import { ListboxProvider } from "./Listbox.context";
import { findNextOption, findPrevOption } from "./domHelpers";

interface ListboxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  setVirtuallyFocusedOptionId: (value: string) => void;
  /**
   * @default "medium"
   */
  size?: "small" | "medium";
}

const ListboxComponent = forwardRef<HTMLDivElement, ListboxProps>(
  (
    {
      children,
      setVirtuallyFocusedOptionId,
      size = "medium",
      className,
      ...rest
    }: ListboxProps,
    ref,
  ) => {
    const id = useId();
    const activeId = `aksel-listbox-${id}-active`;

    const virtuallyFocusOption = (element: HTMLElement | null) => {
      setVirtuallyFocusedOptionId(element?.dataset.id || "");
      element?.scrollIntoView({ block: "nearest" });
    };

    return (
      <div
        ref={ref}
        className={cl("aksel-listbox", className)}
        data-size={size}
        onKeyDown={(event) => {
          const listbox =
            event.currentTarget.querySelector<HTMLElement>('[role="listbox"]');
          if (!listbox) {
            return;
          }

          // Helper functions
          const getFirstOption = (suffix: string = "") =>
            listbox.querySelector<HTMLElement>(`[role="option"]${suffix}`);
          const getLastOption = () => {
            const allOptions =
              listbox.querySelectorAll<HTMLElement>('[role="option"]');
            return allOptions[allOptions.length - 1];
          };

          const focusedOptionElm = getFirstOption(
            '[data-virtual-focus="true"]',
          );

          // Doesn't make sense to have real focus on one option and virtual focus on another at the same time.
          // Not sure if it matters, though 🤔
          const optionElmWithRealFocus = getFirstOption(":focus");
          if (optionElmWithRealFocus) {
            listbox.focus();
          }

          const virtuallyFocusWithFallback = (
            getNextElement: (currentOption: HTMLElement) => HTMLElement | null,
            getFallback: () => HTMLElement | null,
          ) => {
            event.preventDefault();
            if (!focusedOptionElm) {
              virtuallyFocusOption(getFallback());
              return;
            }
            const nextOption = getNextElement(focusedOptionElm);
            if (!nextOption) {
              virtuallyFocusOption(getFallback());
              return;
            }
            virtuallyFocusOption(nextOption);
          };

          switch (event.key) {
            case "ArrowDown":
              virtuallyFocusWithFallback(findNextOption, getFirstOption);
              break;
            case "ArrowUp":
              virtuallyFocusWithFallback(findPrevOption, getLastOption);
              break;
            case "Home":
              event.preventDefault();
              virtuallyFocusOption(getFirstOption());
              break;
            case "End":
              event.preventDefault();
              virtuallyFocusOption(getLastOption());
              break;
            case "Enter":
            case "Accept":
              if (focusedOptionElm) {
                // If we move focus in the option's click handler, onClick will be
                // triggered on the newly focused element unless we preventDefault() here.
                event.preventDefault();
                focusedOptionElm.click();
              }
              break;
            // TODO: Consider implementing PageUp/PageDown too
          }
        }}
        {...rest}
      >
        <ListboxProvider
          activeId={activeId}
          setVirtuallyFocusedOptionId={setVirtuallyFocusedOptionId}
          size={size}
        >
          {children}
        </ListboxProvider>
      </div>
    );
  },
);

/**
 * Low level component for displaying a list of selectable options with optional grouping.
 * Keyboard navigation is implemented with virtual focus so that real focus can remain on an input field.
 */
const Listbox = Object.assign(ListboxComponent, {
  InputSlot: ListboxInputSlot,
  Options: ListboxOptions,
  Option: ListboxOption,
  Group: ListboxGroup,
});

export { Listbox };
export type { ListboxProps };
