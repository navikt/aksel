import type { ComponentMetadata } from "../utils/types/metadata";
import { Chips, ChipsRemovable, ChipsToggle } from "./index";

const metadata: ComponentMetadata = {
  name: "Chips",
  components: {
    Chips,
    "Chips.Removable": ChipsRemovable,
    "Chips.Toggle": ChipsToggle,
  },
  keywords: ["chips", "filter", "tag", "toggle", "removable"],
  related: ["ToggleGroup"],
};

export { metadata };
