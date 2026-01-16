import React, { forwardRef } from "react";
import { composeEventHandlers } from "../../../helpers";
import { useMergeRefs } from "../../../hooks";
import { Slot } from "../../slot/Slot";
import {
  useVirtualFocusDescendant,
  useVirtualFocusInternalContext,
} from "../Context";

export interface VirtualFocusAnchorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "id"> {
  /**
   * The role of the container. This is a limited subset of roles that
   * require manual focus management.
   *
   * Children that are to get focus inside this container element shall be
   * pointed to by `aria-activedescendant`.
   **/
  role:
    | "combobox"
    | "grid"
    | "listbox"
    | "menu"
    | "menubar"
    | "radiogroup"
    | "tree"
    | "treegrid"
    | "tablist";
  /**
   * The function that is run when the focused element
   * is to be selected (eg. do an actual search, change route... etc)
   */
  onSelect: () => void;
  /**
   * The function that is run when the element gets
   * virtual focus set to it.
   */
  onActive: () => void;
  children: React.ReactElement;
  /**
   * Set this to `0` if you want the Anchor itself
   * to be focusable. Since this Anchor is hoisted & merged with
   * its first child, you most likely want to keep this as `0`.
   * @default 0
   */
  tabIndex?: number;
}

/**
 * Must have a single child that is an input element.
 */
export const VirtualFocusAnchor = forwardRef<
  HTMLInputElement,
  VirtualFocusAnchorProps
>(({ onSelect, onActive, children, ...rest }, ref) => {
  const { virtualFocusIdx, setVirtualFocusIdx, loop, uniqueId } =
    useVirtualFocusInternalContext();

  const { register, descendants, index } = useVirtualFocusDescendant({
    handleOnActive: () => {
      setVirtualFocusIdx(0);
      onActive();
    },
    handleOnSelect: onSelect,
  });

  const mergedRefs = useMergeRefs(ref, register);

  return (
    <Slot
      ref={mergedRefs}
      tabIndex={0}
      {...rest}
      id={`virtualfocus-${uniqueId}-${index}`}
      aria-owns={`virtualfocus-${uniqueId}-content`}
      aria-controls={`virtualfocus-${uniqueId}-content`}
      aria-activedescendant={`virtualfocus-${uniqueId}-${virtualFocusIdx}`}
      onKeyDown={composeEventHandlers(rest.onKeyDown, (event) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          const to_focus_descendant = descendants.next(virtualFocusIdx, loop);
          if (to_focus_descendant) {
            to_focus_descendant.handleOnActive();
          }
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          const to_focus_descendant = descendants.prev(virtualFocusIdx, loop);
          if (to_focus_descendant) {
            to_focus_descendant.handleOnActive();
          }
        } else if (event.key === "Enter") {
          const curr = descendants.item(virtualFocusIdx);
          if (curr?.handleOnSelect) {
            curr.handleOnSelect();
          }
        }
      })}
    >
      {children}
    </Slot>
  );
});
