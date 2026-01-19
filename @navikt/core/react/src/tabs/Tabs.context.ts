import { createStrictContext } from "../utils/helpers";
import { createDescendantContext } from "../utils/hooks";
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
export const { Provider: TabsProvider, useContext: useTabsContext } =
  createStrictContext<TabsProviderProps>({
    name: "TabsContext",
    errorMessage:
      "Tabs.List, Tabs.Tag and Tabs.Panel needs to be wrapped within <Tabs>",
  });
