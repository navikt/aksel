import React from "react";
import { DismissableLayer } from "../../overlay/dismiss/DismissableLayer";
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
//    <Autocomplete.Item>
//       ...
//    </Autocomplete.Item>
//    <Autocomplete.Item>
//       ...
//    </Autocomplete.Item>
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
        {children}
      </RovingFocus>
    </DismissableLayer>
  );
};
