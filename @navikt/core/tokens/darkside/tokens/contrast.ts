import { GlobalColorRoles } from "../util";

export const contrastTokenConfig = (): {
  contrast: {
    [key in GlobalColorRoles]: { value: string; type: string; group: string };
  };
} => ({
  contrast: {
    /* core */
    accent: {
      value: "white",
      type: "color",
      group: "contrast",
    },
    neutral: {
      value: "white",
      type: "color",
      group: "contrast",
    },
    /* Status */
    danger: {
      value: "white",
      type: "color",
      group: "contrast",
    },
    info: {
      value: "white",
      type: "color",
      group: "contrast",
    },
    success: {
      value: "white",
      type: "color",
      group: "contrast",
    },
    warning: {
      value: "white",
      type: "color",
      group: "contrast",
    },
    /* Brand */
    brandOne: {
      value: "white",
      type: "color",
      group: "contrast",
    },
    brandTwo: {
      value: "white",
      type: "color",
      group: "contrast",
    },
    brandThree: {
      value: "white",
      type: "color",
      group: "contrast",
    },
    /* Data */
    dataOne: {
      value: "white",
      type: "color",
      group: "contrast",
    },
    dataThree: {
      value: "white",
      type: "color",
      group: "contrast",
    },
    dataTwo: {
      value: "white",
      type: "color",
      group: "contrast",
    },
  },
});
