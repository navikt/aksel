import { createStrictContext } from "../../utils/helpers";
import type { CoachStepType } from "./CoachRoot";

interface CoachContextProps {
  /**
   * Whether the dialog is currently open.
   */
  tourStarted: boolean;
  /**
   * Called when the tour is dismissed or finished.
   */
  onClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /**
   * The index of the current step in the coach sequence.
   */
  currentStep: CoachStepType | null;
  /**
   * The index of the current step in the coach sequence.
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
}

const { Provider: CoachContextProvider, useContext: useCoachContext } =
  createStrictContext<CoachContextProps>({
    name: "CoachContext",
    errorMessage: "useCoachContext must be used within Coach",
  });

export { CoachContextProvider, useCoachContext };
