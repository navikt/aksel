import { createContext } from "../util/hooks/context/create-context";
import { createDescendantContext } from "../util/hooks/descendants/useDescendant";
import { TabsProps } from "./types";
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
    "selectionFollowsFocus" | "loop" | "size" | "iconPosition" | "fitted"
  >;

/* State context */
export const [TabsProvider, useTabsContext] = createContext<TabsProviderProps>({
  name: "TabsContext",
  hookName: "useTabsContext",
  providerName: "TabsProvider",
});
