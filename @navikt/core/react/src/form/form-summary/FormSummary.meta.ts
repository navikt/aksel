import type { ComponentMetadata } from "../../utils/types/metadata";
import {
  FormSummary,
  FormSummaryAnswer,
  FormSummaryAnswers,
  FormSummaryEditLink,
  FormSummaryFooter,
  FormSummaryHeader,
  FormSummaryHeading,
  FormSummaryLabel,
  FormSummaryValue,
} from "./index";

const metadata: ComponentMetadata = {
  name: "FormSummary",
  components: {
    FormSummary,
    "FormSummary.Header": FormSummaryHeader,
    "FormSummary.Heading": FormSummaryHeading,
    "FormSummary.EditLink": FormSummaryEditLink,
    "FormSummary.Answers": FormSummaryAnswers,
    "FormSummary.Answer": FormSummaryAnswer,
    "FormSummary.Label": FormSummaryLabel,
    "FormSummary.Value": FormSummaryValue,
    "FormSummary.Footer": FormSummaryFooter,
  },
  keywords: ["form summary", "skjemaoppsummering", "summary", "review", "form"],
};

export { metadata };
