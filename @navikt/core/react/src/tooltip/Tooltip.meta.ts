import type { ComponentMetadata } from "../utils/types/metadata";
import { Tooltip } from "./index";

const metadata: ComponentMetadata = {
  name: "Tooltip",
  components: {
    Tooltip,
  },
  keywords: ["tooltip", "hjelpetekst", "hint", "popover", "hover"],
  related: ["Popover", "HelpText"],
};

export { metadata };
