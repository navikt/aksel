import { createContext } from "../util/create-context";
import { CollapsibleBaseProps } from "./Collapsible.types";

export type CollapsibleContextProps = Pick<CollapsibleBaseProps, "open"> & {
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

export const [CollapsibleContextProvider, useCollapsibleContext] =
  createContext<CollapsibleContextProps>({
    name: "CollapsibleContext",
    errorMessage:
      "<Collapsible.Trigger> and <Collapsible.Content> must be used within a <Collapsible>",
  });
