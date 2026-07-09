import type { ComponentMetadata } from "../utils/types/metadata";
import { Alert } from "./index";

const metadata: ComponentMetadata = {
  name: "Alert",
  components: {
    Alert,
  },
  keywords: ["alert", "varsel", "feilmelding", "warning", "info"],
  related: ["InlineMessage"],
};

export { metadata };
