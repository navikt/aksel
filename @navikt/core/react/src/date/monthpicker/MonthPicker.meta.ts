import type { ComponentMetadata } from "../../utils/types/metadata";
import {
  MonthPicker,
  MonthPickerInput,
  MonthPickerStandalone,
  useMonthpicker,
} from "./index";

const metadata: ComponentMetadata = {
  name: "MonthPicker",
  components: {
    MonthPicker,
    "MonthPicker.Standalone": MonthPickerStandalone,
    "MonthPicker.Input": MonthPickerInput,
  },
  utils: {
    useMonthpicker,
  },
  keywords: ["month", "monthpicker", "månedsvelger", "calendar", "kalender"],
  related: ["DatePicker"],
};

export { metadata };
