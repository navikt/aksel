import type { ComponentMetadata } from "../../utils/types/metadata";
import { Spacer, Stack, VStack } from "./index";

const metadata: ComponentMetadata = {
  name: "VStack",
  components: {
    VStack,
    Spacer,
    Stack,
  },
  keywords: ["stack", "vstack", "layout", "flex", "column", "kolonne"],
  related: ["Box", "HGrid", "HStack"],
};

export { metadata };
