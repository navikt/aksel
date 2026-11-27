import type { ComponentMetadata } from "../../utils/types/metadata";
import { ComboboxSingle } from "./";

const metadata: ComponentMetadata = {
  name: "Combobox",
  components: {
    ComboboxSingle,
  },
  keywords: [
    "combobox",
    "select",
    "multiselect",
    "nedtrekksliste",
    "dropdown",
    "form",
    "input",
  ],
  related: ["Select", "Combobox-legacy"],
};

export { metadata };
