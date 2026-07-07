import type { ComponentMetadata } from "../utils/types/metadata";
import { Tabs, TabsList, TabsPanel, TabsTab } from "./index";

const metadata: ComponentMetadata = {
  name: "Tabs",
  components: {
    Tabs,
    "Tabs.List": TabsList,
    "Tabs.Tab": TabsTab,
    "Tabs.Panel": TabsPanel,
  },
  keywords: ["tabs", "faner", "tab", "navigation", "sections"],
  related: ["ToggleGroup"],
};

export { metadata };
