import { createContext } from "../util/create-context";
import { createDescendantContext } from "../util/hooks/descendants/useDescendant";
import { TabsProps } from "./Tabs.types";
import { useTabs } from "./useTabs";

export const [
  TabsDescendantsProvider,
  useTabsDescendantsContext,
  useTabsDescendants,
  useTabsDescendant,
] = createDescendantContext<HTMLButtonElement, { value: string }>();

type TabsProviderProps = ReturnType<typeof useTabs> &
  Pick<
    TabsProps,
    "selectionFollowsFocus" | "loop" | "size" | "iconPosition" | "fill"
  >;

/* State context */
export const [TabsProvider, useTabsContext] = createContext<TabsProviderProps>({
  name: "TabsContext",
  hookName: "useTabsContext",
  providerName: "TabsProvider",
  errorMessage:
    "Tabs.List, Tabs.Tag and Tabs.Panel needs to be wrapped within <Tabs>",
});
