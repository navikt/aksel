import { createStrictContext } from "../../utils/helpers";
import type { CollapsibleProps } from "./CollapsibleRoot";

export type CollapsibleContextProps = {
  /**
   * The open state of the collapsible.
   */
  open: boolean;
  /**
   * Allows connecting trigger to content
   */
  contentId: string;
  /**
   * Allows connecting content to trigger
   */
  triggerId: string;
  /**
   * Callback for toggling open state
   */
  onOpenToggle: () => void;
  /**
   * Utility for getting state as string. Usefull for data-attributes.
   */
  state: "open" | "closed";
} & Required<Pick<CollapsibleProps, "closedBehavior">>;

export const {
  Provider: CollapsibleContextProvider,
  useContext: useCollapsibleContext,
} = createStrictContext<CollapsibleContextProps>({
  name: "CollapsibleContext",
  errorMessage:
    "<Collapsible.Trigger> and <Collapsible.Content> must be used within a <Collapsible>",
});
