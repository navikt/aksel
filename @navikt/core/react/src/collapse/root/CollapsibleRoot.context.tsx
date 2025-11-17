import type { TransitionStatus } from "../../overlays/overlay/hooks/useTransitionStatus";
import { createContext } from "../../util/create-context";
import type { useCollapsibleRoot } from "./useCollapsibleRoot";

export interface CollapsibleRootContext
  extends ReturnType<typeof useCollapsibleRoot> {
  transitionStatus: TransitionStatus;
  collapsedHeight?: number;
}

const [CollapsibleRootContextProvider, useCollapsibleRootContext] =
  createContext<CollapsibleRootContext>({
    hookName: "useCollapsibleRootContext",
    providerName: "<CollapsibleRootContextProvider>",
    errorMessage:
      "useCollapsibleRootContext must be used within a <Collapsible.Root> component",
  });

export { CollapsibleRootContextProvider, useCollapsibleRootContext };
