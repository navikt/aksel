import { createDescendantContext } from "../util/hooks/descendants/useDescendant";
import { SlottedDivElementRef } from "./parts/SlottedDivElement";

export const [
  MenuDescendantsProvider,
  useMenuDescendantsContext,
  useMenuDescendants,
  useMenuDescendant,
] = createDescendantContext<SlottedDivElementRef>();
