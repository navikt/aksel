import { createContext as ReactCreateContext } from "react";
import { createContext } from "../util/hooks/context/create-context";
import { createDescendantContext } from "../util/hooks/descendants/useDescendant";
import { TabsContextProps } from "./types";

/* Old */
export const TabsContext = ReactCreateContext<TabsContextProps | null>(null);

/* Descendant context */
export const [
  TabsDescendantsProvider,
  useTabsDescendantsContext,
  useTabsDescendants,
  useTabsDescendant,
] = createDescendantContext<HTMLButtonElement, { value: string }>();

/* State context */
export const [TabsProvider, useTabsContext] = createContext<TabsContextProps>({
  name: "TabsContext",
  hookName: "useTabsContext",
  providerName: "TabsProvider",
});
