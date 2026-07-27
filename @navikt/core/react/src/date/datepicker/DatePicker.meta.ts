import type { ComponentMetadata } from "../../utils/types/metadata";
import {
  DatePicker,
  DatePickerInput,
  DatePickerStandalone,
  useDatepicker,
  useRangeDatepicker,
} from "./index";

const metadata: ComponentMetadata = {
  name: "DatePicker",
  components: {
    DatePicker,
    "DatePicker.Standalone": DatePickerStandalone,
    "DatePicker.Input": DatePickerInput,
  },
  utils: {
    useDatepicker,
    useRangeDatepicker,
  },
  keywords: ["date", "datepicker", "datovelger", "calendar", "kalender"],
  related: ["MonthPicker"],
};

export { metadata };
