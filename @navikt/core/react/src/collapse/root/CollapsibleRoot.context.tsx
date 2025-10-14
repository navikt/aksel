import type { TransitionStatus } from "../../overlays/overlay/hooks/useTransitionStatus";
import type { useCollapsibleRoot } from "./useCollapsibleRoot";

export interface CollapsibleRootContext
  extends ReturnType<typeof useCollapsibleRoot> {
  onOpenChange: (open: boolean) => void;
  transitionStatus: TransitionStatus;
}
