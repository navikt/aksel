import type { ComponentMetadata } from "../utils/types/metadata";
import { Coach } from "./index";

const metadata: ComponentMetadata = {
  name: "Coach",
  components: {
    Coach,
    "Coach.Step": Coach.Step,
    "Coach.Beacon": Coach.Beacon,
    "Coach.Progress": Coach.Progress,
    "Coach.Title": Coach.Title,
    "Coach.Description": Coach.Description,
    "Coach.Footer": Coach.Footer,
    "Coach.NextTrigger": Coach.NextTrigger,
    "Coach.PreviousTrigger": Coach.PreviousTrigger,
    "Coach.CloseTrigger": Coach.CloseTrigger,
    "Coach.ShowTourTrigger": Coach.ShowTourTrigger,
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
