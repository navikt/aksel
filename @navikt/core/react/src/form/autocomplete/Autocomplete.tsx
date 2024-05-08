import React from "react";
import { DismissableLayer } from "../../overlay/dismiss/DismissableLayer";
import { Floating } from "../../overlays/floating/Floating";
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

export const Autocomplete = ({ children }: { children: React.ReactNode }) => {
  const descendants = useAutocompleteDescendants();
  return (
    <DismissableLayer>
      <RovingFocus asChild descendants={descendants}>
        <Floating>{children}</Floating>
      </RovingFocus>
    </DismissableLayer>
  );
};

export const AutocompleteAnchor = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Floating.Anchor className="navds-autocomplete-anchor">
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
}: {
  children: React.ReactNode;
}) => {
  return <div className="navds-autocomplete-item">{children}</div>;
};

Autocomplete.Anchor = AutocompleteAnchor;
Autocomplete.Item = AutocompleteItem;
Autocomplete.Content = AutocompleteContent;

export default Autocomplete;
