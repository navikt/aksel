import { createContext } from "../util/create-context";
import { createDescendantContext } from "../util/hooks/descendants/useDescendant";
import type { MenuContentElementRef } from "./Menu.types";
import { SlottedDivElementRef } from "./parts/SlottedDivElement";

export const [
  MenuDescendantsProvider,
  useMenuDescendantsContext,
  useMenuDescendants,
  useMenuDescendant,
] = createDescendantContext<SlottedDivElementRef>();

type MenuContextValue = {
  open: boolean;
  onOpenChange(open: boolean): void;
  content: MenuContentElementRef | null;
  onContentChange(content: MenuContentElementRef | null): void;
};

export const [MenuProvider, useMenuContext] = createContext<MenuContextValue>({
  providerName: "MenuProvider",
  hookName: "useMenuContext",
});

type MenuRootContextValue = {
  onClose(): void;
  isUsingKeyboardRef: React.RefObject<boolean>;
  modal: boolean;
};

export const [MenuRootProvider, useMenuRootContext] =
  createContext<MenuRootContextValue>({
    providerName: "MenuRootProvider",
    hookName: "useMenuRootContext",
  });
