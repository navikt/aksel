import type { ComponentMetadata } from "../../utils/types/metadata";
import { Box, BoxNew } from "./index";

const metadata: ComponentMetadata = {
  name: "Box",
  components: {
    Box,
    BoxNew,
  },
  keywords: ["box", "layout", "container", "primitive", "surface"],
  related: ["Stack", "HGrid", "Page"],
};

export { metadata };
