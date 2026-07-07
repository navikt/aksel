import type { ComponentMetadata } from "../../utils/types/metadata";
import { HStack, Spacer, Stack, VStack } from "./index";

const metadata: ComponentMetadata = {
  name: "Stack",
  components: {
    Stack,
    HStack,
    VStack,
    Spacer,
  },
  keywords: ["stack", "hstack", "vstack", "layout", "flex"],
  related: ["Box", "HGrid"],
};

export { metadata };
