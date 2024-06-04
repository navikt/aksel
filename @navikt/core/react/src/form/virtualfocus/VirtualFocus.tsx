import React, { Dispatch, SetStateAction, forwardRef, useState } from "react";
import { createContext } from "../../util/create-context";
import { useMergeRefs } from "../../util/hooks";
import { createDescendantContext } from "../../util/hooks/descendants/useDescendant";
import { SlottedDivElementRef } from "./SlottedDivElement";
import { remove_virtual_focus, set_virtual_focus } from "./utils";

// The recipe for success!
//
// 1. look at Menu PR, copy pasta + adjust
// 2. useDescendants for switching focus (iterating focus through list)
// 3. <Slot /> usage? it's (radix) the enabler for asChild (merge parent props into single child + melt away)
// 4. <dismissableLayer /> click/focus outside
// 5. <Floating /> utility
//
// perhaps a desired API?
//
// <VirtualFocus>
//    <VirtualFocus.Anchor>
//        ...
//    </VirtualFocus.Anchor>
//    <VirtualFocus.Content>
//        <VirtualFocus.Item>
//           ...
//        </VirtualFocus.Item>
//        <VirtualFocus.Item>
//           ...
//        </VirtualFocus.Item>
//    <VirtualFocus.Content>
// </VirtualFocus>

export const [
  VirtualFocusDescendantsProvider,
  useVirtualFocusDescendantsContext,
  useVirtualFocusDescendants,
  useVirtualFocusDescendant,
] = createDescendantContext<
  SlottedDivElementRef,
  {
    handleVirtualOnFocus?: (
      node_to_focus: HTMLElement,
      node_to_blur?: HTMLElement,
    ) => void;
    handlePick?: () => void;
  }
>();

const [VirtualFocusInternalContextProvider, useVirtualFocusInternalContext] =
  createContext<{
    virtualFocusIdx: number;
    setVirtualFocusIdx: Dispatch<SetStateAction<number>>;
    loop: boolean;
  }>();

type Props = {
  children: React.ReactNode;
  /**
   * Whether to cause focus to loop around when it hits the first or last element
   * @default true
   **/
  loop?: boolean;
};

// set aria-activedescendant
// role=listbox
//
// videre:
// 1. use this <VirtualFocus> inside other stuff we have (as a demo / dogfood)
//   - Combobox
//   - Search (prop for virtualfocus on <Search>)
// 2. release it publicly?
export const VirtualFocus = ({ children, loop = true }: Props) => {
  const descendants = useVirtualFocusDescendants();
  const [virtualFocusIdx, setVirtualFocusIdx] = useState(0);

  return (
    <VirtualFocusInternalContextProvider
      virtualFocusIdx={virtualFocusIdx}
      setVirtualFocusIdx={setVirtualFocusIdx}
      loop={loop}
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
   * The function that is run when the focused element
   * is to be picked (eg. do an actual search, change route)
   */
  pick: () => void;
  /**
   * The function that is run when the element gets
   * virtual focus set to it.
   */
  onActive: () => void;
  children: React.ReactNode;
}

export const VirtualFocusAnchor = forwardRef<
  HTMLDivElement,
  VirtualFocusAnchorProps
>(({ children, pick, onActive }, ref) => {
  const { register, descendants } = useVirtualFocusDescendant({
    handleVirtualOnFocus: (node_to_focus, node_to_blur) => {
      set_virtual_focus(node_to_focus, node_to_blur);
      onActive();
    },
    handlePick: () => {
      pick();
    },
  });
  const { virtualFocusIdx, setVirtualFocusIdx, loop } =
    useVirtualFocusInternalContext();

  const mergedRefs = useMergeRefs(ref, register);

  return (
    <div
      role="searchbox"
      tabIndex={0}
      ref={mergedRefs}
      onBlur={() => {
        const curr = descendants.item(virtualFocusIdx);
        if (curr?.node) {
          remove_virtual_focus(curr.node);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          const curr = descendants.item(virtualFocusIdx);
          const next = descendants.next(virtualFocusIdx, loop);
          if (next?.handleVirtualOnFocus && curr?.node) {
            next.handleVirtualOnFocus(next.node, curr.node);
            setVirtualFocusIdx(next.index);
          }
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          const curr = descendants.item(virtualFocusIdx);
          const prev = descendants.prev(virtualFocusIdx, loop);
          if (prev?.handleVirtualOnFocus && curr?.node) {
            prev.handleVirtualOnFocus(prev.node, curr?.node);
            setVirtualFocusIdx(prev.index);
          }
        } else if (event.key === "Enter") {
          const curr = descendants.item(0);
          if (curr?.handlePick) {
            curr.handlePick();
          }
        }
      }}
    >
      {children}
    </div>
  );
});

export const VirtualFocusContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="navds-virtualfocus-content">{children}</div>;
};

export interface VirtualFocusItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The function that is run when the element is focused
   * (virtually, not actual focus, eg. set a border around an item)
   */
  focus: () => void;
  children: React.ReactNode;
}

export const VirtualFocusItem = ({
  children,
  focus,
}: VirtualFocusItemProps) => {
  const { register, index, descendants } = useVirtualFocusDescendant({
    handleVirtualOnFocus: (node_to_focus, node_to_blur) => {
      set_virtual_focus(node_to_focus, node_to_blur);
      focus();
    },
  });
  const { virtualFocusIdx, setVirtualFocusIdx } =
    useVirtualFocusInternalContext();

  return (
    <div
      id={`descendant-${index}`}
      className="navds-virtualfocus-item"
      role="button"
      ref={register}
      tabIndex={-1} // shouldn't really be focusable, they are virtually focusable, but can be clicked
      onFocus={() => {}} // set focus to anchor?
      onKeyDown={() => {}} // set focus to anchor?
      onClick={() => {
        const anchor = descendants.item(0);
        if (anchor?.handlePick) {
          anchor.handlePick();
        }
      }}
      onMouseMove={(event) => {
        const prev = descendants.item(virtualFocusIdx);
        const currIdx = descendants.indexOf(event.currentTarget);
        const curr = descendants.item(currIdx);
        if (prev?.node) {
          remove_virtual_focus(prev.node);
        }
        if (curr?.node && curr?.handleVirtualOnFocus) {
          curr.handleVirtualOnFocus(curr.node);
          setVirtualFocusIdx(curr.index);
        }
      }}
    >
      {children}
    </div>
  );
};

VirtualFocus.Anchor = VirtualFocusAnchor;
VirtualFocus.Item = VirtualFocusItem;
VirtualFocus.Content = VirtualFocusContent;

export default VirtualFocus;
