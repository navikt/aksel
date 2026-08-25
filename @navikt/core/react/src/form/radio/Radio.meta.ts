import type { ComponentMetadata } from "../../utils/types/metadata";
import { Radio, RadioGroup } from "./index";

const metadata: ComponentMetadata = {
  name: "Radio",
  components: {
    Radio,
    RadioGroup,
  },
  keywords: ["radio", "radioknapp", "form", "input", "choice"],
  related: ["Checkbox"],
};

export { metadata };
