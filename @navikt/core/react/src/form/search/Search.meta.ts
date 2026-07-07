import type { ComponentMetadata } from "../../utils/types/metadata";
import { Search, SearchButton } from "./index";

const metadata: ComponentMetadata = {
  name: "Search",
  components: {
    Search,
    "Search.Button": SearchButton,
  },
  keywords: ["search", "søk", "input", "filter", "find"],
  related: ["Combobox"],
};

export { metadata };
