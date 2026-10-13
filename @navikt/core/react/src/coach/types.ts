import type React from "react";
import type { Popover } from "../popover";
import { ComponentTranslation } from "../utils/i18n/i18n.types";

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
   * Whether the tour is visible.
   */
  showTour: boolean;
  /**
   * Called when the tour is dismissed or finished.
   */
  endTour: () => void;
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
  onStepChange?: (step: number) => void;
  /**
   * Translations for buttons in the coach component: Next, Previous, Close.
   */
  translations?: ComponentTranslation<"Coach">;
}

interface CoachTourProps extends CoachBaseProps {
  /**
   * Steps shown in sequence.
   */
  steps: readonly CoachStepItem[];
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
    },
  ) => React.ReactNode | undefined;
  children?: never;
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

type CoachSingleStepChildren =
  | React.ReactNode
  | ((context: {
      defaultContent: React.ReactNode;
      title?: React.ReactNode;
      description?: React.ReactNode;
      image?: React.ReactNode;
    }) => React.ReactNode);

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
    renderStep?: never;
    /**
     * Custom content for the single step.
     * Can be elements or a render function taking `{ defaultContent, title, description, image }`.
     */
    children?: CoachSingleStepChildren;
  };

type CoachProps = CoachTourProps | CoachSingleStepProps;

export type {
  CoachAnchorStep,
  CoachBaseProps,
  CoachDialogStep,
  CoachProps,
  CoachSingleStepChildren,
  CoachSingleStepProps,
  CoachStepBase,
  CoachStepItem,
  CoachStepTarget,
  CoachTourProps,
};
