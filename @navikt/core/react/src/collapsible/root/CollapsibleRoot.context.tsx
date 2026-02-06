import { createStrictContext } from "../../utils/helpers";

export type CollapsibleContextProps = {
  /**
   * The controlled open state of the collapsible. Must be used in conjunction with onOpenChange.
   */
  open?: boolean;
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
   * Allows always rendering children in content when closed
   */
  lazy: boolean;
  /**
   * Utility for getting state as string. Usefull for data-attributes.
   */
  state: "open" | "closed";
};

export const {
  Provider: CollapsibleContextProvider,
  useContext: useCollapsibleContext,
} = createStrictContext<CollapsibleContextProps>({
  name: "CollapsibleContext",
  errorMessage:
    "<Collapsible.Trigger> and <Collapsible.Content> must be used within a <Collapsible>",
});
