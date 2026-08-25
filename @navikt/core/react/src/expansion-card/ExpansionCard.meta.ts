import type { ComponentMetadata } from "../utils/types/metadata";
import {
  ExpansionCard,
  ExpansionCardContent,
  ExpansionCardDescription,
  ExpansionCardHeader,
  ExpansionCardTitle,
} from "./index";

const metadata: ComponentMetadata = {
  name: "ExpansionCard",
  components: {
    ExpansionCard,
    "ExpansionCard.Header": ExpansionCardHeader,
    "ExpansionCard.Title": ExpansionCardTitle,
    "ExpansionCard.Description": ExpansionCardDescription,
    "ExpansionCard.Content": ExpansionCardContent,
  },
  keywords: [
    "expansion card",
    "expandable",
    "collapsible",
    "accordion",
    "kort",
  ],
  related: ["Accordion", "ReadMore"],
};

export { metadata };
