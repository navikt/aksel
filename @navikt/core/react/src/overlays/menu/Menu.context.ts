import { createContext } from "../../util/create-context";
import { GraceIntent, MenuContentType } from "./Menu.types";

/**
 * Menu
 */
type MenuContextValue = {
  onClose: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: MenuContentType | null;
  onContentChange(content: MenuContentType | null): void;
  /* isUsingKeyboardRef: React.RefObject<boolean>; */
};

export const [MenuProvider, useMenuContext] = createContext<MenuContextValue>({
  name: "MenuContext",
  hookName: "useMenu",
  providerName: "MenuProvider",
});

/**
 * MenuContent
 */
type MenuContentContextValue = {
  onItemEnter: (event: React.PointerEvent) => void;
  onItemLeave: (event: React.PointerEvent) => void;
  onTriggerLeave: (event: React.PointerEvent) => void;
  pointerGraceTimerRef: React.MutableRefObject<number>;
  onPointerGraceIntentChange: (intent: GraceIntent | null) => void;
};

export const [MenuContentProvider, useMenuContentContext] =
  createContext<MenuContentContextValue>({
    name: "MenuContentContext",
    hookName: "useMenuContentContext",
    providerName: "MenuContentProvider",
  });
