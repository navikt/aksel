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

/**
 * Improvements:
 * - Autocomplete for "related"-key. Might need to generate a list of all components based on existing metadata files. Could be a script that runs on build and generates a json file with all components and their metadata.
 * -
 */
