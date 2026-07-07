import type { ComponentMetadata } from "../utils/types/metadata";
import { Popover, PopoverContent } from "./index";

const metadata: ComponentMetadata = {
  name: "Popover",
  components: {
    Popover,
    "Popover.Content": PopoverContent,
  },
  keywords: ["popover", "overlay", "tooltip", "floating", "bubble"],
  related: ["Tooltip"],
};

export { metadata };
