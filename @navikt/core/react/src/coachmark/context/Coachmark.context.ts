import { createStrictContext } from "../../utils/helpers";
import { CoachmarkStepType } from "../root/CoachmarkRoot";

interface CoachmarkContextProps {
  /**
   * Whether the dialog is currently open.
   */
  tourStarted: boolean;
  /**
   * Called when the tour is dismissed or finished.
   */
  onClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /**
   * The index of the current step in the coachmark sequence.
   */
  currentStep: CoachmarkStepType | null;
  /**
   * The index of the current step in the coachmark sequence.
   */
  currentStepIndex: number;
  /**
   * The total number of steps in the coachmark sequence.
   */
  totalSteps: number;
  /**
   * Advances to the next step in the coachmark sequence.
   */
  goToNextStep: () => void;
  /**
   * Goes to the previous step in the coachmark sequence.
   */
  goToPreviousStep: () => void;
}

const { Provider: CoachmarkContextProvider, useContext: useCoachmarkContext } =
  createStrictContext<CoachmarkContextProps>({
    name: "CoachmarkContext",
    errorMessage: "useCoachmarkContext must be used within Coachmark",
  });

export { CoachmarkContextProvider, useCoachmarkContext };
