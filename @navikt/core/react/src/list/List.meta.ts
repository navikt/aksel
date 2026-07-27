import type { ComponentMetadata } from "../utils/types/metadata";
import { List, ListItem } from "./index";

const metadata: ComponentMetadata = {
  name: "List",
  components: {
    List,
    "List.Item": ListItem,
  },
  keywords: ["list", "liste", "bullet", "ordered", "unordered"],
};

export { metadata };
