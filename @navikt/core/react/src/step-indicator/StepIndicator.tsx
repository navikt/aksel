import cl from "classnames";
import React, {
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import mergeRefs from "react-merge-refs";
import Step, { StepIndicatorStepProps, StepIndicatorStepType } from "./Step";

export interface StepIndicatorProps
  extends React.HTMLAttributes<HTMLOListElement> {
  /**
   * <StepIndicator.Step /> elements
   */
  children: React.ReactNode;
  /**
   * Adds classname to wrapper
   */
  className?: string;
  /**
   * Current active step index
   */
  activeStep: number;
  /**
   * Callback for clicked step index
   */
  onStepChange?: (step: number) => void;
  /**
   * Hides labels for each step if true
   * @default false
   */
  hideLabels?: boolean;
  /**
   * enables `hideLabels` internally when steps start to overflow.
   * @note declaring `hideLabels` overwrites this functionality
   */
  responsive?: boolean;
}

interface StepIndicatorComponent
  extends React.ForwardRefExoticComponent<
    StepIndicatorProps & React.RefAttributes<HTMLOListElement>
  > {
  Step: StepIndicatorStepType;
}

interface StepContextProps {
  activeStep: number;
  onStepChange: (step: number) => void;
  hideLabels: boolean;
}

export const StepContext = createContext<StepContextProps | null>(null);

const StepIndicator: StepIndicatorComponent = forwardRef<
  HTMLOListElement,
  StepIndicatorProps
>(
  (
    {
      children,
      className,
      activeStep,
      hideLabels,
      onStepChange = () => {},
      responsive,
      ...rest
    },
    ref
  ) => {
    const wrapperRef = useRef<HTMLOListElement | null>(null);
    const mergedRef = mergeRefs([wrapperRef, ref]);

    const [showLabels, setShowLabels] = useState(true);

    const removeLabels = hideLabels ?? (!!responsive && !showLabels);

    const stepsWithIndex = React.Children.map(children, (step, index) => {
      return React.isValidElement<StepIndicatorStepProps>(step) ? (
        <li
          className={cl("navds-step-indicator__step-wrapper", {
            "navds-step-indicator__step-wrapper--hidelabel": removeLabels,
          })}
          key={index}
          aria-current={index === activeStep && "step"}
        >
          {React.cloneElement(step, {
            ...step.props,
            index,
          })}
        </li>
      ) : (
        step
      );
    });

    const canShowLabels = useCallback(() => {
      const remSize = parseFloat(
        String(getComputedStyle(document.documentElement).fontSize)
      );
      const childrenLength = React.Children.toArray(children).filter((child) =>
        React.isValidElement(child)
      ).length;

      wrapperRef.current &&
        setShowLabels(
          wrapperRef.current?.getBoundingClientRect().width >=
            remSize * 10 * childrenLength
        );
    }, [children]);

    useEffect(() => {
      window.addEventListener("resize", canShowLabels);
      canShowLabels();
      return () => {
        window.removeEventListener("resize", canShowLabels);
      };
    }, [canShowLabels]);

    return (
      <ol
        ref={mergedRef}
        className={cl(`navds-step-indicator`, className)}
        {...rest}
      >
        <StepContext.Provider
          value={{
            activeStep,
            onStepChange,
            hideLabels: removeLabels,
          }}
        >
          {stepsWithIndex}
        </StepContext.Provider>
      </ol>
    );
  }
) as StepIndicatorComponent;

StepIndicator.Step = Step;

export default StepIndicator;
