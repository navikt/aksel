import React, { forwardRef } from "react";
import { composeEventHandlers } from "../../../helpers";
import { useMergeRefs } from "../../../hooks";
import { Slot } from "../../slot/Slot";
import {
  useVirtualFocusDescendant,
  useVirtualFocusInternalContext,
} from "../Context";

export interface VirtualFocusItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "id" | "tabIndex"> {
  /**
   * The function that is run when the element is focused
   * (virtually, not actual focus, eg. set a border around an item)
   */
  onActive: () => void;
  /**
   * The function that is run when the focused element
   * is to be selected (eg. do an actual search, change route... etc)
   */
  onSelect: () => void;
  children: React.ReactNode;
}

/**
 * Contains an item you want to be iterable via virtual focus.
 */
export const VirtualFocusItem = forwardRef<HTMLElement, VirtualFocusItemProps>(
  ({ children, onActive, onSelect, ...rest }, ref) => {
    const { virtualFocusIdx, setVirtualFocusIdx, uniqueId } =
      useVirtualFocusInternalContext();
    const { register, index } = useVirtualFocusDescendant({
      handleOnActive: () => {
        setVirtualFocusIdx(index);
        onActive();
      },
      handleOnSelect: onSelect,
    });

    const mergedRefs = useMergeRefs(ref, register);
    return (
      <Slot
        ref={mergedRefs}
        {...rest}
        id={`virtualfocus-${uniqueId}-${index}`}
        data-aksel-virtualfocus={virtualFocusIdx === index}
        tabIndex={-1}
        onClick={composeEventHandlers(rest.onClick, () => {
          onSelect();
        })}
        onMouseMove={composeEventHandlers(rest.onMouseMove, () => {
          setVirtualFocusIdx(index);
          onActive();
        })}
      >
        {children}
      </Slot>
    );
  },
);
