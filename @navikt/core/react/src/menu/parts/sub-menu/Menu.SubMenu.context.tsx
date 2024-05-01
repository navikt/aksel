import { createContext } from "../../../util/create-context";
import { MenuItemElement } from "../item/Menu.Item";

type MenuSubContextValue = {
  contentId: string;
  triggerId: string;
  trigger: MenuItemElement | null;
  onTriggerChange(trigger: MenuItemElement | null): void;
};

export const [MenuSubProvider, useMenuSubContext] =
  createContext<MenuSubContextValue>({
    providerName: "MenuSubProvider",
    hookName: "useMenuSubContext",
  });
