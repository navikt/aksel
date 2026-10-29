import { createStrictContext } from "../../utils/helpers";
import type { CoachStepItem } from "../types";

interface CoachContextProps {
  /**
   * Whether the tour is currently open.
   */
  showTour: boolean;
  /** Opens the tour from a mark. */
  openTour?: () => void;
  /** Whether tour triggers are disabled. */
  disableTour?: boolean;
  /**
   * Called when the tour is dismissed or finished.
   */
  onClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /**
   * The index of the current step in the coach sequence.
   */
  currentStep: CoachStepItem | null;
  /**
   * The index of the current step in the coach sequence (0-based).
   */
  currentStepIndex: number;
  /**
   * The total number of steps in the coach sequence.
   */
  totalSteps: number;
  /**
   * Advances to the next step in the coach sequence.
   */
  goToNextStep: () => void;
  /**
   * Goes to the previous step in the coach sequence.
   */
  goToPreviousStep: () => void;
  /**
   * The size of the current step in the coach sequence.
   */
  currentStepSize: "small" | "medium";
  /**
   * ID of the title element for aria-labelledby.
   */
  titleId?: string;
  /**
   * Sets the title element ID.
   */
  setTitleId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const { Provider: CoachContextProvider, useContext: useCoachContext } =
  createStrictContext<CoachContextProps>({
    name: "CoachContext",
    errorMessage: "useCoachContext must be used within Coach",
  });

export { CoachContextProvider, useCoachContext };
