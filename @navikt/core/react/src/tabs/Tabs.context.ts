import { createStrictContext } from "../utils/helpers";
import type { TabsProps } from "./Tabs.types";
import type { useTabs } from "./useTabs";

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
