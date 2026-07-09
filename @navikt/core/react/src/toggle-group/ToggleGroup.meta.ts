import type { ComponentMetadata } from "../utils/types/metadata";
import { ToggleGroup, ToggleGroupItem } from "./index";

const metadata: ComponentMetadata = {
  name: "ToggleGroup",
  components: {
    ToggleGroup,
    "ToggleGroup.Item": ToggleGroupItem,
  },
  keywords: ["toggle group", "toggle", "segmented", "switch", "tabs"],
  related: ["Tabs", "Chips"],
};

export { metadata };
