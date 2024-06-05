import React, { Dispatch, SetStateAction, forwardRef, useState } from "react";
import { createContext } from "../../util/create-context";
import { useMergeRefs } from "../../util/hooks";
import { createDescendantContext } from "../../util/hooks/descendants/useDescendant";
import { SlottedDivElementRef } from "./SlottedDivElement";

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
//      <VirtualFocus.Content>
//          <VirtualFocus.Item>
//             ...
//          </VirtualFocus.Item>
//          <VirtualFocus.Item>
//             ...
//          </VirtualFocus.Item>
//      <VirtualFocus.Content>
//    </VirtualFocus.Anchor>
// </VirtualFocus>

export const [
  VirtualFocusDescendantsProvider,
  useVirtualFocusDescendantsContext,
  useVirtualFocusDescendantInitializer,
  useVirtualFocusDescendant,
] = createDescendantContext<
  SlottedDivElementRef,
  {
    handlePick: () => void;
    handleOnActive: () => void;
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
  const descendants = useVirtualFocusDescendantInitializer();
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
  const { virtualFocusIdx, setVirtualFocusIdx, loop } =
    useVirtualFocusInternalContext();

  const { register, descendants, index } = useVirtualFocusDescendant({
    handlePick: () => {
      pick();
    },
    handleOnActive: () => {
      setVirtualFocusIdx(0);
      onActive();
    },
  });

  const mergedRefs = useMergeRefs(ref, register);

  return (
    <div
      tabIndex={0}
      role="searchbox"
      ref={mergedRefs}
      onBlur={() => {
        const curr = descendants.item(virtualFocusIdx);
        if (curr?.node) {
          setVirtualFocusIdx(0);
        }
      }}
      aria-activedescendant={`descendant-${index}`} // TODO: useId()
      onKeyDown={(event) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          const to_focus_descendant = descendants.next(virtualFocusIdx, loop);
          const to_focus = to_focus_descendant?.node;

          if (to_focus) {
            to_focus_descendant.handleOnActive();
            setVirtualFocusIdx(to_focus_descendant.index);
          }
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          const to_focus_descendant = descendants.prev(virtualFocusIdx, loop);
          const to_focus = to_focus_descendant?.node;

          if (to_focus) {
            to_focus_descendant.handleOnActive();
            setVirtualFocusIdx(to_focus_descendant.index);
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
  const { setVirtualFocusIdx } = useVirtualFocusInternalContext();

  return (
    <div
      className="navds-virtualfocus-content"
      onMouseLeave={() => {
        setVirtualFocusIdx(0);
      }}
    >
      {children}
    </div>
  );
};

export interface VirtualFocusItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The function that is run when the element is focused
   * (virtually, not actual focus, eg. set a border around an item)
   */
  onActive: () => void;
  children: React.ReactNode;
}

export const VirtualFocusItem = ({
  children,
  onActive,
}: VirtualFocusItemProps) => {
  const { register, descendants, index } = useVirtualFocusDescendant({
    handleOnActive: () => {
      onActive();
    },
    handlePick: () => {
      const anchor = descendants.item(0);
      anchor?.handlePick();
    },
  });
  const { virtualFocusIdx, setVirtualFocusIdx } =
    useVirtualFocusInternalContext();

  return (
    <div
      id={`descendant-${index}`} // TODO: useId() appended here (from anchor)
      className="navds-virtualfocus-item"
      role="button"
      data-aksel-virtualfocus={virtualFocusIdx === index}
      ref={register}
      tabIndex={-1} // shouldn't really be focusable, they are virtually focusable, but can be clicked
      onFocus={() => {
        const anchor = descendants.item(0);
        anchor?.node.focus();
      }} // set focus to anchor?
      onKeyDown={() => {}} // set focus to anchor?
      onClick={(event) => {
        const currIdx = descendants.indexOf(event.currentTarget);
        const curr = descendants.item(currIdx);
        if (curr) {
          curr.handlePick();
        }
      }}
      onMouseMove={(event) => {
        const currIdx = descendants.indexOf(event.currentTarget);
        const curr = descendants.item(currIdx);
        if (curr) {
          setVirtualFocusIdx(curr.index);
          curr.handleOnActive();
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
