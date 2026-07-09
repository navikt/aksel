import type { ComponentMetadata } from "../utils/types/metadata";
import { Provider } from "./index";

const metadata: ComponentMetadata = {
  name: "Provider",
  components: {
    Provider,
  },
  keywords: ["provider", "context", "config", "locale", "setup"],
  related: ["Theme"],
};

export { metadata };
