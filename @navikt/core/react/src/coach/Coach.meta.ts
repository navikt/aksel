import type { ComponentMetadata } from "../utils/types/metadata";
import { Coach } from "./index";

const metadata: ComponentMetadata = {
  name: "Coach",
  components: {
    Coach,
    "Coach.Step": Coach.Step,
    "Coach.Mark": Coach.Mark,
    "Coach.Progress": Coach.Progress,
    "Coach.Title": Coach.Title,
    "Coach.Description": Coach.Description,
    "Coach.Footer": Coach.Footer,
    "Coach.NextTrigger": Coach.NextTrigger,
    "Coach.PreviousTrigger": Coach.PreviousTrigger,
    "Coach.CloseTrigger": Coach.CloseTrigger,
    "Coach.Image": Coach.Image,
  },
  keywords: [
    "coach",
    "dialog",
    "popup",
    "step",
    "guide",
    "tutorial",
    "walkthrough",
    "onboarding",
    "tour",
    "coachmark",
  ],
};

export { metadata };
