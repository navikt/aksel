import type { ComponentMetadata } from "../../utils/types/metadata";
import { HStack, Spacer, Stack } from "./index";

const metadata: ComponentMetadata = {
  name: "HStack",
  components: {
    HStack,
    Spacer,
    Stack,
  },
  keywords: ["stack", "hstack", "layout", "flex", "row", "rad"],
  related: ["Box", "HGrid", "VStack"],
};

export { metadata };
