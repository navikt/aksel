import type { MenuPortalProps } from "../../utils/components/floating-menu/Menu";
import { createStrictContext } from "../../utils/helpers";

type ActionMenuContextValue = {
  triggerId: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenToggle: () => void;
  rootElement: MenuPortalProps["rootElement"];
  size: "small" | "medium";
};

const { Provider: ActionMenuProvider, useContext: useActionMenuContext } =
  createStrictContext<ActionMenuContextValue>({
    name: "ActionMenuContext",
    errorMessage:
      "ActionMenu sub-components cannot be rendered outside the ActionMenu component.",
  });

export { ActionMenuProvider, useActionMenuContext };
export type { ActionMenuContextValue };
