import type { ComponentMetadata } from "../utils/types/metadata";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./index";

const metadata: ComponentMetadata = {
  name: "Accordion",
  components: {
    Accordion,
    "Accordion.Item": AccordionItem,
    "Accordion.Header": AccordionHeader,
    "Accordion.Content": AccordionContent,
  },
  keywords: ["accordion", "expandable", "collapsible", "toggle"],
};

export { metadata };
