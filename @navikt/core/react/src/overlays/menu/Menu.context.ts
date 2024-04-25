import { createContext } from "../../util/create-context";
import { MenuContentType } from "./Menu.types";

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
/* type MenuContentContextValue = {};

export const [MenuContentProvider, useMenuContentContext] =
  createContext<MenuContentContextValue>({
    name: "MenuContentContext",
    hookName: "useMenuContentContext",
    providerName: "MenuContentProvider",
  });
 */
