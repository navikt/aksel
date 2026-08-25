import type { ComponentMetadata } from "../../utils/types/metadata";
import { Checkbox, CheckboxGroup } from "./index";

const metadata: ComponentMetadata = {
  name: "Checkbox",
  components: {
    Checkbox,
    CheckboxGroup,
  },
  keywords: ["checkbox", "avkrysningsboks", "form", "input", "choice"],
  related: ["Radio", "Switch"],
};

export { metadata };
