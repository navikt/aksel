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
// <Autocomplete>
//    <Autocomplete.Anchor>
//        ...
//    </Autocomplete.Anchor>
//    <Autocomplete.Content>
//        <Autocomplete.Item>
//           ...
//        </Autocomplete.Item>
//        <Autocomplete.Item>
//           ...
//        </Autocomplete.Item>
//    <Autocomplete.Content>
// </Autocomplete>

export const [
  AutocompleteDescendantsProvider,
  useAutocompleteDescendantsContext,
  useAutocompleteDescendants,
  useAutocompleteDescendant,
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

export const [AutocompleteContextProvider, useAutocompleteValue] =
  createContext<{
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
  }>();

const [AutocompleteInternalContextProvider, useAutocompleteInternalContext] =
  createContext<{
    virtualFocusIdx: number;
    setVirtualFocusIdx: Dispatch<SetStateAction<number>>;
  }>();

export const Autocomplete = ({ children }: { children: React.ReactNode }) => {
  const descendants = useAutocompleteDescendants();
  const [value, setValue] = useState("");
  const [virtualFocusIdx, setVirtualFocusIdx] = useState(0);
  return (
    <AutocompleteInternalContextProvider
      virtualFocusIdx={virtualFocusIdx}
      setVirtualFocusIdx={setVirtualFocusIdx}
    >
      <AutocompleteContextProvider value={value} setValue={setValue}>
        <AutocompleteDescendantsProvider value={descendants}>
          <div
            onChange={(event) => {
              // assumption: there is a bubbling onChange from an input inside Anchor
              setValue((event.target as HTMLInputElement).value);
            }}
          >
            {children}
          </div>
        </AutocompleteDescendantsProvider>
      </AutocompleteContextProvider>
    </AutocompleteInternalContextProvider>
  );
};

export interface AutocompleteAnchorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The function that is run when the focused element
   * is to be picked (eg. do an actual search, change route)
   */
  pick: () => void;
  children: React.ReactNode;
}

export const AutocompleteAnchor = forwardRef<
  HTMLDivElement,
  AutocompleteAnchorProps
>(({ children, pick }, ref) => {
  const { setValue } = useAutocompleteValue();

  const { register, descendants } = useAutocompleteDescendant({
    handleVirtualOnFocus: (node_to_focus, node_to_blur) => {
      set_virtual_focus(node_to_focus, node_to_blur);
      setValue(""); // TODO: might want to let user define this instead (focus function on Anchor)
    },
    handlePick: () => {
      pick();
    },
  });
  const { virtualFocusIdx, setVirtualFocusIdx } =
    useAutocompleteInternalContext();

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
          const next = descendants.next(virtualFocusIdx);
          if (next?.handleVirtualOnFocus && curr?.node) {
            next.handleVirtualOnFocus(next.node, curr.node);
            setVirtualFocusIdx(next.index);
          }
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          const curr = descendants.item(virtualFocusIdx);
          const prev = descendants.prev(virtualFocusIdx);
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

export const AutocompleteContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="navds-autocomplete-content">{children}</div>;
};

export interface AutocompleteItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The function that is run when the element is focused
   * (virtually, not actual focus, eg. set a border around an item)
   */
  focus: () => void;
  children: React.ReactNode;
}

export const AutocompleteItem = ({
  children,
  focus,
}: AutocompleteItemProps) => {
  const { register, index, descendants } = useAutocompleteDescendant({
    handleVirtualOnFocus: (node_to_focus, node_to_blur) => {
      set_virtual_focus(node_to_focus, node_to_blur);
      focus();
    },
  });
  const { virtualFocusIdx, setVirtualFocusIdx } =
    useAutocompleteInternalContext();

  return (
    <div
      id={`descendant-${index}`}
      className="navds-autocomplete-item"
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

Autocomplete.Anchor = AutocompleteAnchor;
Autocomplete.Item = AutocompleteItem;
Autocomplete.Content = AutocompleteContent;

export default Autocomplete;
