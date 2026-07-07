import type { ComponentMetadata } from "../../utils/types/metadata";
import { FormProgress, FormProgressStep } from "./index";

const metadata: ComponentMetadata = {
  name: "FormProgress",
  components: {
    FormProgress,
    "FormProgress.Step": FormProgressStep,
  },
  keywords: [
    "form progress",
    "skjemaprogresjon",
    "steps",
    "progress",
    "wizard",
  ],
  related: ["Stepper"],
};

export { metadata };
