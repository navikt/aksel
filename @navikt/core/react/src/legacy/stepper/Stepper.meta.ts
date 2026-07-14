import type { ComponentMetadata } from "../../utils/types/metadata";
import { Stepper, StepperStep } from "./index";

const metadata: ComponentMetadata = {
  name: "Stepper",
  components: {
    Stepper,
    "Stepper.Step": StepperStep,
  },
  keywords: ["stepper", "steg", "steps", "progress", "wizard"],
  related: ["FormProgress"],
};

export { metadata };
