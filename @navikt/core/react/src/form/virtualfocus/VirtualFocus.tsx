import React, {
  Dispatch,
  SetStateAction,
  forwardRef,
  useId,
  useState,
} from "react";
import { createContext } from "../../util/create-context";
import { useMergeRefs } from "../../util/hooks";
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
    handlePick: () => void;
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

type Props = {
  children: React.ReactNode;
  /**
   * Whether to cause focus to loop around when it hits the first or last element
   * @default true
   **/
  loop?: boolean;
};

export const VirtualFocus = ({ children, loop = true }: Props) => {
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
   * The function that is run when the focused element
   * is to be picked (eg. do an actual search, change route... etc)
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
  const { virtualFocusIdx, setVirtualFocusIdx, loop, uniqueId } =
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
      id={`descendant-${uniqueId}-${index}`}
      tabIndex={0}
      role="searchbox"
      ref={mergedRefs}
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
  return <div className="navds-virtualfocus-content">{children}</div>;
};

export interface VirtualFocusItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The function that is run when the element is focused
   * (virtually, not actual focus, eg. set a border around an item)
   */
  onActive: () => void;
  /**
   * The function that is run when the focused element
   * is to be picked (eg. do an actual search, change route... etc)
   */
  pick: () => void;
  children: React.ReactNode;
}

export const VirtualFocusItem = ({
  children,
  onActive,
  pick,
}: VirtualFocusItemProps) => {
  const { register, descendants, index } = useVirtualFocusDescendant({
    handleOnActive: () => {
      onActive();
    },
    handlePick: () => {
      pick();
    },
  });
  const { virtualFocusIdx, setVirtualFocusIdx, uniqueId } =
    useVirtualFocusInternalContext();

  // TODO: const mergedRefs = useMergeRefs(ref, register);

  return (
    <div
      id={`descendant-${uniqueId}-${index}`}
      className="navds-virtualfocus-item"
      role="button"
      data-aksel-virtualfocus={virtualFocusIdx === index}
      ref={register}
      tabIndex={-1}
      onKeyDown={() => {}} // Visible, non-interactive elements with click handlers must have at least one keyboard listener
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
