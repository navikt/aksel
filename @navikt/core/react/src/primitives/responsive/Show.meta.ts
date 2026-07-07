import type { ComponentMetadata } from "../../utils/types/metadata";
import { Hide, Show } from "./index";

const metadata: ComponentMetadata = {
  name: "Show",
  components: {
    Show,
    Hide,
  },
  keywords: ["show", "hide", "responsive", "layout", "breakpoint"],
  related: ["Box"],
};

export { metadata };
