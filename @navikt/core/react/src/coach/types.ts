import type React from "react";
import type { Popover } from "../popover";
import type { ComponentTranslation } from "../utils/i18n/i18n.types";
import type { CoachMark } from "./mark/CoachMark";

interface CoachStepBase {
  /**
   * Unique identifier for the coach step.
   */
  id: string;
  /**
   * Whether the user is allowed to end the tour at this step.
   */
  allowToEndTour?: boolean;
  /**
   * Updates sub-component padding + DialogTitle and DialogDescription font-size.
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * Width of the coach step
   * @default "medium"
   */
  width?: "small" | "medium";
  /**
   * Image content for the coach step.
   */
  image?: React.ReactNode;
  /**
   * Title content for the coach step.
   */
  title?: React.ReactNode;
  /**
   * Description content for the coach step.
   */
  description?: React.ReactNode;
  /**
   * Overrides `aria-labelledby` on the step container.
   * If omitted, defaults to the ID of `<Coach.Title>`.
   */
  "aria-labelledby"?: string;
}

interface CoachDialogStep {
  /**
   * Dialog type coach step.
   */
  type: "dialog";
}

interface CoachAnchorStep {
  /**
   * Anchor type coach step.
   */
  type: "anchor";
  /**
   * Reference to the anchor element for the anchor type coach step.
   */
  anchorRef: React.RefObject<HTMLElement | null>;
  /**
   * Placement of the anchor type coach step relative to the anchor element.
   */
  placement?: NonNullable<React.ComponentProps<typeof Popover>["placement"]>;
  /**
   * Offset of the anchor type coach step relative to the anchor element.
   */
  offset?: number;
}

type CoachStepTarget = CoachDialogStep | CoachAnchorStep;

type CoachStepItem = CoachStepBase & CoachStepTarget;

interface CoachBaseProps {
  /**
   * Controls whether the tour is visible.
   * When omitted, Coach.Mark opens the tour using internal state.
   */
  showTour?: boolean;
  /**
   * Called when a mark opens the tour or the tour closes.
   */
  onShowTourChange?: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * Hides the tour and its marks without hiding the elements they are anchored to.
   * @default false
   */
  disableTour?: boolean;
  /**
   * Active step index when controlled.
   */
  currentStep?: number;
  /**
   * Initial active step index when uncontrolled.
   * @default 0
   */
  defaultStep?: number;
  /**
   * Called when the active step changes.
   */
  onStepChange?: React.Dispatch<React.SetStateAction<number>>;
  /**
   * Translations for buttons in the coach component: Next, Previous, Close.
   */
  translations?: ComponentTranslation<"Coach">;
  /**
   * Coach.Mark triggers rendered outside the popup.
   * Provide step content through props or renderStep instead.
   */
  children?:
    | React.ReactElement<
        React.ComponentProps<typeof CoachMark>,
        typeof CoachMark
      >
    | React.ReactElement<
        React.ComponentProps<typeof CoachMark>,
        typeof CoachMark
      >[];
  /**
   * Custom render function for each coach step.
   * Return `defaultContent` or `undefined` to keep standard layout for that step.
   */
  renderStep?: (
    step: {
      id: string;
      title?: React.ReactNode;
      description?: React.ReactNode;
      image?: React.ReactNode;
    },
    context: {
      defaultContent: React.ReactNode;
      index: number;
      totalSteps: number;
    },
  ) => React.ReactNode | undefined;
}

interface CoachTourProps extends CoachBaseProps {
  /**
   * Steps shown in sequence.
   */
  steps: readonly CoachStepItem[];
  type?: never;
  id?: never;
  title?: never;
  description?: never;
  image?: never;
  allowToEndTour?: never;
  size?: never;
  width?: never;
  anchorRef?: never;
  placement?: never;
  offset?: never;
  "aria-labelledby"?: never;
}

type CoachSingleStepProps = CoachBaseProps &
  (Omit<CoachStepBase, "id"> & {
    /**
     * Unique identifier for the coach step.
     * @default "step-1"
     */
    id?: string;
  }) &
  CoachStepTarget & {
    steps?: never;
  };

type CoachProps = CoachTourProps | CoachSingleStepProps;

export type {
  CoachAnchorStep,
  CoachBaseProps,
  CoachDialogStep,
  CoachProps,
  CoachSingleStepProps,
  CoachStepBase,
  CoachStepItem,
  CoachStepTarget,
  CoachTourProps,
};
