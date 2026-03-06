/* eslint-disable jsx-a11y/no-static-element-interactions */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: We know what we are doing */
import React from "react";
import { ListboxGroup } from "../group/ListboxGroup";
import { ListboxInputSlot } from "../input-slot/ListboxInputSlot";
import { ListboxItem } from "../item/ListboxItem";
import { ListboxList } from "../list/ListboxList";
import { findNextItem, findPrevItem } from "./domHelpers";

export interface ListboxProps {
  children: React.ReactNode;
  setVirtuallyFocusedItemId: (value: string) => void;
}

/**
 * Low level component for displaying a list of selectable items with optional grouping.
 * Keyboard navigation is implemented with virtual focus so that real focus can remain on an input field.
 */
function Listbox({ children, setVirtuallyFocusedItemId }: ListboxProps) {
  const virtuallyFocusItem = (element: HTMLElement | null) => {
    setVirtuallyFocusedItemId(element?.dataset.id || "");
    element?.scrollIntoView({ block: "nearest" });
  };

  return (
    <div
      onKeyDown={(event) => {
        const listbox =
          event.currentTarget.querySelector<HTMLElement>('[role="listbox"]');
        if (!listbox) {
          return;
        }

        // Helper functions
        const getFirstItem = (suffix: string = "") =>
          listbox.querySelector<HTMLElement>(`[role="option"]${suffix}`);
        const getLastItem = () => {
          const allItems =
            listbox.querySelectorAll<HTMLElement>('[role="option"]');
          return allItems[allItems.length - 1];
        };

        const focusedItemElm = getFirstItem('[data-virtual-focus="true"]');

        // Doesn't make sense to have real focus on one item and virtual focus on another at the same time.
        // Not sure if it matters, though 🤔
        const itemElmWithRealFocus = getFirstItem(":focus");
        if (itemElmWithRealFocus) {
          listbox.focus();
        }

        const virtuallyFocusWithFallback = (
          getNextElement: (currentItem: HTMLElement) => HTMLElement | null,
          getFallback: () => HTMLElement | null,
        ) => {
          event.preventDefault();
          if (!focusedItemElm) {
            virtuallyFocusItem(getFallback());
            return;
          }
          const nextItem = getNextElement(focusedItemElm);
          if (!nextItem) {
            virtuallyFocusItem(getFallback());
            return;
          }
          virtuallyFocusItem(nextItem);
        };

        switch (event.key) {
          case "ArrowDown":
            virtuallyFocusWithFallback(findNextItem, getFirstItem);
            break;
          case "ArrowUp":
            virtuallyFocusWithFallback(findPrevItem, getLastItem);
            break;
          case "Home":
            event.preventDefault();
            virtuallyFocusItem(getFirstItem());
            break;
          case "End":
            event.preventDefault();
            virtuallyFocusItem(getLastItem());
            break;
          case "Enter":
          case "Accept":
            if (focusedItemElm) {
              focusedItemElm.click();
            }
            break;
          // TODO: Consider implementing PageUp/PageDown too
        }
      }}
    >
      {children}
    </div>
  );
}

Listbox.InputSlot = ListboxInputSlot;
Listbox.List = ListboxList;
Listbox.Item = ListboxItem;
Listbox.Group = ListboxGroup;

export default Listbox;
