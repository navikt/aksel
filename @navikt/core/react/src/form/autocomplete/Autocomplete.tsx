import React, { Dispatch, SetStateAction, useState } from "react";
import { DismissableLayer } from "../../overlay/dismiss/DismissableLayer";
import { Floating } from "../../overlays/floating/Floating";
import { createContext } from "../../util/create-context";
import { createDescendantContext } from "../../util/hooks/descendants/useDescendant";
import { RovingFocus } from "./RovingFocus";
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
] = createDescendantContext<SlottedDivElementRef>();

export const [AutocompleteContextProvider, useAutocompleteValue] =
  createContext<{
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
  }>();

export const Autocomplete = ({ children }: { children: React.ReactNode }) => {
  const descendants = useAutocompleteDescendants();
  const [value, setValue] = useState("");
  console.log({ value });
  return (
    <DismissableLayer>
      <AutocompleteContextProvider {...{ value, setValue }}>
        <AutocompleteDescendantsProvider value={descendants}>
          <RovingFocus asChild descendants={descendants}>
            <Floating>{children}</Floating>
          </RovingFocus>
        </AutocompleteDescendantsProvider>
      </AutocompleteContextProvider>
    </DismissableLayer>
  );
};

export const AutocompleteAnchor = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { register, index, descendants } = useAutocompleteDescendant();
  return (
    <Floating.Anchor
      className="navds-autocomplete-anchor"
      ref={register}
      onKeyDown={(event) => {
        if (event.key === "ArrowDown") {
          descendants.next(index)?.node.focus();
        } else if (event.key === "ArrowUp") {
          descendants.prev(index)?.node.focus();
        }
      }}
    >
      {children}
    </Floating.Anchor>
  );
};

export const AutocompleteContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Floating.Content className="navds-autocomplete-content">
      {children}
    </Floating.Content>
  );
};

export const AutocompleteItem = ({
  children,
  pick,
}: {
  children: React.ReactNode;
  pick: () => void;
}) => {
  const { register, index, descendants } = useAutocompleteDescendant();
  return (
    <div
      className="navds-autocomplete-item"
      role="button"
      tabIndex={0}
      ref={register}
      onFocus={() => {
        pick();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowDown") {
          descendants.next(index)?.node.focus();
        } else if (event.key === "ArrowUp") {
          descendants.prev(index)?.node.focus();
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
