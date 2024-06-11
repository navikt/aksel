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

type Props = {
  children: React.ReactNode;
  /**
   * The role of the container. This is a limited subset of roles that
   * require manual focus management.
   *
   * Children that are to get focus inside this container element shall be
   * pointed to by `aria-activedescendant`.
   **/
  containerRole:
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
   * Whether to cause focus to loop around when it hits the first or last element
   * @default true
   **/
  loop?: boolean;
};

export const VirtualFocus = ({
  children,
  containerRole,
  loop = false,
}: Props) => {
  const descendants = useVirtualFocusDescendantInitializer();
  const [virtualFocusIdx, setVirtualFocusIdx] = useState(0);

  return (
    <VirtualFocusInternalContextProvider
      virtualFocusIdx={virtualFocusIdx}
      setVirtualFocusIdx={setVirtualFocusIdx}
      loop={loop}
      uniqueId={useId().replace(/:/g, "")}
      containerRole={containerRole}
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
   * is to be selected (eg. do an actual search, change route... etc)
   */
  onSelect: () => void;
  /**
   * The function that is run when the element gets
   * virtual focus set to it.
   */
  onActive: () => void;
  children: React.ReactNode;
  /**
   * set this to `-1` if you have an input element inside
   * the Anchor that you would rather tab to directly instead
   * of having to tab to the Anchor itself first.
   *
   * @default 0
   */
  tabIndex?: number;
}

export const VirtualFocusAnchor = forwardRef<
  HTMLDivElement,
  VirtualFocusAnchorProps
>(({ children, onSelect, onActive, ...rest }, ref) => {
  const { virtualFocusIdx, setVirtualFocusIdx, loop, uniqueId, containerRole } =
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
    <div
      id={`virtualfocus-${uniqueId}-${index}`}
      className="navds-virtualfocus-anchor"
      role={containerRole}
      tabIndex={-1}
      aria-owns={`virtualfocus-${uniqueId}-content`}
      aria-controls={`virtualfocus-${uniqueId}-content`}
      aria-activedescendant={`virtualfocus-${uniqueId}-${virtualFocusIdx}`}
      ref={mergedRefs}
      onKeyDown={(event) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          const to_focus_descendant = descendants.next(virtualFocusIdx, loop);
          const to_focus = to_focus_descendant?.node;

          if (to_focus) {
            to_focus_descendant.handleOnActive();
          }
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          const to_focus_descendant = descendants.prev(virtualFocusIdx, loop);
          const to_focus = to_focus_descendant?.node;

          if (to_focus) {
            to_focus_descendant.handleOnActive();
          }
        } else if (event.key === "Enter") {
          const curr = descendants.item(0);
          if (curr?.handleOnSelect) {
            curr.handleOnSelect();
          }
        }
      }}
      {...rest}
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
  const { uniqueId } = useVirtualFocusInternalContext();
  return (
    <div
      id={`virtualfocus-${uniqueId}-content`}
      className="navds-virtualfocus-content"
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
    const { register, descendants, index } = useVirtualFocusDescendant({
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
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
      <div
        id={`virtualfocus-${uniqueId}-${index}`}
        className="navds-virtualfocus-item"
        data-aksel-virtualfocus={virtualFocusIdx === index}
        ref={mergedRefs}
        tabIndex={-1}
        onClick={(event) => {
          const currIdx = descendants.indexOf(event.currentTarget);
          const curr = descendants.item(currIdx);
          if (curr) {
            curr.handleOnSelect();
          }
        }}
        onMouseMove={(event) => {
          const currIdx = descendants.indexOf(event.currentTarget);
          const curr = descendants.item(currIdx);
          if (curr) {
            curr.handleOnActive();
          }
        }}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

VirtualFocus.Anchor = VirtualFocusAnchor;
VirtualFocus.Item = VirtualFocusItem;
VirtualFocus.Content = VirtualFocusContent;

export default VirtualFocus;
