import { createContext } from "../util/create-context";
import { CollapsibleBaseProps } from "./Collapsible.types";

export type CollapsibleContextProps = Pick<
  CollapsibleBaseProps,
  "open" | "disabled"
> & {
  /**
   * Allows connecting trigger to content
   */
  contentId: string;
  /**
   * Callback for toggling open state
   */
  onOpenToggle: () => void;
  /**
   * Allows always rendering children in content when closed
   */
  lazy: boolean;
};

export const [CollapsibleContextProvider, useCollapsibleContext] =
  createContext<CollapsibleContextProps>({
    name: "CollapsibleContext",
    errorMessage:
      "<Collapsible.Trigger> and <Collapsible.Content> must be used within a <Collapsible>",
  });
