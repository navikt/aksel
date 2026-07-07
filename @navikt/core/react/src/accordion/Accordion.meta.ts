import type { ComponentMetadata } from "../utils/types/metadata";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./index";

/**
 * TODO: extract filename so we can link to dir
 * autocomplete for related components. Autogen with script like sanity schemas
 */
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
