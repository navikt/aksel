import { createDescendantContext } from "../../util/hooks/descendants/useDescendant";

export const [
  DescendantsProvider,
  useDescendantsContext,
  useDescendants,
  useDescendant,
] = createDescendantContext<
  HTMLDivElement,
  { disableOutsidePointerEvents: boolean }
>();
