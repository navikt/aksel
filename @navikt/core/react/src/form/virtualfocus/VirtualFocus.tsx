import React, { Dispatch, SetStateAction, forwardRef, useState } from "react";
import { Slot } from "../../util/Slot";
import { createContext } from "../../util/create-context";
import { useId, useMergeRefs } from "../../util/hooks";
import { createDescendantContext } from "../../util/hooks/descendants/useDescendant";
import { SlottedDivElementRef } from "./SlottedDivElement";

export const [
  VirtualFocusDescendantsProvider,
  useVirtualFocusDescendantsContext,
  useVirtualFocusDescendantInitializer,
  useVirtualFocusDescendant,
] = createDescendantContext<
  SlottedDivElementRef,
  {
    handleOnSelect: () => void;
    handleOnActive: () => void;
  }
>();

const [VirtualFocusInternalContextProvider, useVirtualFocusInternalContext] =
  createContext<{
    virtualFocusIdx: number;
    setVirtualFocusIdx: Dispatch<SetStateAction<number>>;
    loop: boolean;
    uniqueId: string;
  }>();

type VirtualFocusProps = {
  children: React.ReactNode;
  /**
   * Whether to cause focus to loop around when it hits the first or last element
   * @default true
   **/
  loop?: boolean;
};

export const VirtualFocus = ({ children, loop = false }: VirtualFocusProps) => {
  const descendants = useVirtualFocusDescendantInitializer();
  const [virtualFocusIdx, setVirtualFocusIdx] = useState(0);

  return (
    <VirtualFocusInternalContextProvider
      virtualFocusIdx={virtualFocusIdx}
      setVirtualFocusIdx={setVirtualFocusIdx}
      loop={loop}
      uniqueId={useId()}
    >
      <VirtualFocusDescendantsProvider value={descendants}>
        {children}
      </VirtualFocusDescendantsProvider>
    </VirtualFocusInternalContextProvider>
  );
};

export interface VirtualFocusAnchorProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
   * Set this to `0` if you want the Anchor container itself
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
    handleOnSelect: () => {
      onSelect();
    },
    handleOnActive: () => {
      setVirtualFocusIdx(0);
      onActive();
    },
  });

  const mergedRefs = useMergeRefs(ref, register);

  return (
    <Slot
ref={mergedRefs}
      {...rest}
      id={`virtualfocus-${uniqueId}-${index}`}
      tabIndex={0}
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

export interface VirtualFocusContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const VirtualFocusContent = forwardRef<
  HTMLDivElement,
  VirtualFocusContentProps
>(({ children, ...rest }, ref) => {
  const { uniqueId } = useVirtualFocusInternalContext();
  return (
    <div ref={ref} id={`virtualfocus-${uniqueId}-content`} {...rest}>
      {children}
    </div>
  );
});

export interface VirtualFocusItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
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

export const VirtualFocusItem = forwardRef<HTMLElement, VirtualFocusItemProps>(
  ({ children, onActive, onSelect, ...rest }, ref) => {
    const { virtualFocusIdx, setVirtualFocusIdx, uniqueId } =
      useVirtualFocusInternalContext();
    const { register, index } = useVirtualFocusDescendant({
      handleOnActive: () => {
        setVirtualFocusIdx(index);
        onActive();
      },
      handleOnSelect: () => {
        onSelect();
      },
    });

    const mergedRefs = useMergeRefs(ref, register);
    return (
      <Slot
        id={`virtualfocus-${uniqueId}-${index}`}
        data-aksel-virtualfocus={virtualFocusIdx === index}
        ref={mergedRefs}
        tabIndex={-1}
        onClick={() => {
          onSelect();
        }}
        onMouseMove={() => {
          setVirtualFocusIdx(index);
          onActive();
        }}
        {...rest}
      >
        {children}
      </Slot>
    );
  },
);

VirtualFocus.Anchor = VirtualFocusAnchor;
VirtualFocus.Item = VirtualFocusItem;
VirtualFocus.Content = VirtualFocusContent;

export default VirtualFocus;
