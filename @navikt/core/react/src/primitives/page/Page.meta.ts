import type { ComponentMetadata } from "../../utils/types/metadata";
import { Page, PageBlock } from "./index";

const metadata: ComponentMetadata = {
  name: "Page",
  components: {
    Page,
    "Page.Block": PageBlock,
  },
  keywords: ["page", "layout", "primitive", "template", "side"],
  related: ["Box", "HStack", "VStack"],
};

export { metadata };
