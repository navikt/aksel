import type { ComponentMetadata } from "../../utils/types/metadata";
import { ErrorSummary, ErrorSummaryItem } from "./index";

const metadata: ComponentMetadata = {
  name: "ErrorSummary",
  components: {
    ErrorSummary,
    "ErrorSummary.Item": ErrorSummaryItem,
  },
  keywords: [
    "error summary",
    "feiloppsummering",
    "validation",
    "form",
    "error",
  ],
};

export { metadata };
