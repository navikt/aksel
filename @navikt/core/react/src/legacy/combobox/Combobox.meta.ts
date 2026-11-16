import type { ComponentMetadata } from "../../utils/types/metadata";
import { UNSAFE_Combobox } from "./index";

const metadata: ComponentMetadata = {
  name: "Combobox",
  components: {
    Combobox: UNSAFE_Combobox,
  },
  keywords: ["combobox", "autocomplete", "select", "søk", "multiselect"],
  related: ["Select", "Search"],
};

export { metadata };
