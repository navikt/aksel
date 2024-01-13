import { createContext as ReactCreateContext } from "react";
import { createContext } from "../util/hooks/context/create-context";
import { createDescendantContext } from "../util/hooks/descendants/useDescendant";
import { TabsContextProps, TabsProps } from "./types";
import { useTabs } from "./useTabs";

/* Old */
export const TabsContext = ReactCreateContext<TabsContextProps | null>(null);

/* Descendant context */
export const [
  TabsDescendantsProvider,
  useTabsDescendantsContext,
  useTabsDescendants,
  useTabsDescendant,
] = createDescendantContext<HTMLButtonElement, { value: string }>();

type TabsProviderProps = ReturnType<typeof useTabs> &
  Pick<TabsProps, "selectionFollowsFocus" | "loop" | "size" | "iconPosition">;

/* State context */
export const [TabsProvider, useTabsContext] = createContext<TabsProviderProps>({
  name: "TabsContext",
  hookName: "useTabsContext",
  providerName: "TabsProvider",
});
