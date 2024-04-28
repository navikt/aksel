import { createDescendantContext } from "../../util/hooks/descendants/useDescendant";

export const [
  DismissableDescendantsProvider,
  useDismissableDescendantsContext,
  useDismissableDescendants,
  useDismissableDescendant,
] = createDescendantContext<
  HTMLDivElement,
  { disableOutsidePointerEvents: boolean }
>();
