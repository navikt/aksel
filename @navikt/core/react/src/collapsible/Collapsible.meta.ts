import type { ComponentMetadata } from "../utils/types/metadata";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./index";

const metadata: ComponentMetadata = {
  name: "Collapsible",
  components: {
    Collapsible,
    "Collapsible.Trigger": CollapsibleTrigger,
    "Collapsible.Content": CollapsibleContent,
  },
  keywords: ["collapsible", "expandable", "toggle", "accordion", "disclosure"],
  related: ["Accordion", "ReadMore"],
};

export { metadata };
