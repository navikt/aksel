/* https://github.com/Stanko/react-animate-height/blob/v3/src/index.tsx */
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { useTimeout } from "../util/hooks/useTimeout";

// ------------------ Types

export type Height = "auto" | number | `${number}%`;
type Overflow = "auto" | "visible" | "hidden" | undefined;

// ------------------ Helpers

const prefersReducedMotion = globalThis?.matchMedia
  ? globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches
  : false;

function isNumber(n: string) {
  const number = parseFloat(n);
  return !Number.isNaN(number) && Number.isFinite(number);
}

function isPercentage(height: Height) {
  // Percentage height
  return (
    typeof height === "string" &&
    height[height.length - 1] === "%" &&
    isNumber(height.substring(0, height.length - 1))
  );
}

function hideContent(element: HTMLDivElement | null, height: Height) {
  // Check for element?.style is added cause this would fail in tests (react-test-renderer)
  // Read more here: https://github.com/Stanko/react-animate-height/issues/17
  if (height === 0 && element?.style) {
    element.style.display = "none";
  }
}

function showContent(element: HTMLDivElement | null, height: Height) {
  // Check for element?.style is added cause this would fail in tests (react-test-renderer)
  // Read more here: https://github.com/Stanko/react-animate-height/issues/17
  if (height === 0 && element?.style) {
    element.style.display = "";
  }
}

// ------------------ Component

interface AnimateHeightProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @default 250ms
   */
  duration?: number;
  /**
   * @default "ease"
   */
  easing?: string;
  height: Height;
  innerClassName?: string;
}

const AnimateHeight: React.FC<AnimateHeightProps> = ({
  children,
  className,
  innerClassName,
  duration: userDuration = 250,
  easing = "ease",
  height,
  ...props
}) => {
  // ------------------ Initialization
  const prevHeight = useRef<Height>(height);
  const contentElement = useRef<HTMLDivElement>(null);

  const animationClassTimeout = useTimeout();
  const animationTimeout = useTimeout();

  const initialHeight = useRef<Height>(height);
  const initialOverflow = useRef<Overflow>("visible");

  const duration = prefersReducedMotion ? 0 : userDuration;

  if (typeof initialHeight.current === "number") {
    // Reset negative height to 0
    if (typeof height !== "string") {
      initialHeight.current = height < 0 ? 0 : height;
    }
    initialOverflow.current = "hidden";
  } else if (isPercentage(initialHeight.current)) {
    // If value is string "0%" make sure we convert it to number 0
    initialHeight.current = height === "0%" ? 0 : height;
    initialOverflow.current = "hidden";
  }

  const [currentHeight, setCurrentHeight] = useState<Height>(
    initialHeight.current,
  );
  const [overflow, setOverflow] = useState<Overflow>(initialOverflow.current);
  const [useTransitions, setUseTransitions] = useState<boolean>(false);

  useEffect(() => {
    // Hide content if height is 0 (to prevent tabbing into it)
    hideContent(contentElement.current, initialHeight.current);
  }, []);

  // ------------------ Height update
  // biome-ignore lint/correctness/useExhaustiveDependencies: This should be explicitly run only on height change
  useEffect(() => {
    if (height !== prevHeight.current && contentElement.current) {
      showContent(contentElement.current, prevHeight.current);

      // Cache content height
      contentElement.current.style.overflow = "hidden";
      const contentHeight = contentElement.current.offsetHeight;
      contentElement.current.style.overflow = "";

      // set total animation time
      const totalDuration = duration;

      let newHeight: Height;
      let timeoutHeight: Height;
      let timeoutOverflow: Overflow = "hidden";
      let timeoutUseTransitions: boolean;

      const isCurrentHeightAuto = prevHeight.current === "auto";

      if (typeof height === "number") {
        // Reset negative height to 0
        newHeight = height < 0 ? 0 : height;
        timeoutHeight = newHeight;
      } else if (isPercentage(height)) {
        // If value is string "0%" make sure we convert it to number 0
        newHeight = height === "0%" ? 0 : height;
        timeoutHeight = newHeight;
      } else {
        // If not, animate to content height
        // and then reset to auto
        newHeight = contentHeight; // TODO solve contentHeight = 0
        timeoutHeight = "auto";
        timeoutOverflow = undefined;
      }

      if (isCurrentHeightAuto) {
        // This is the height to be animated to
        timeoutHeight = newHeight;

        // If previous height was 'auto'
        // set starting height explicitly to be able to use transition
        newHeight = contentHeight;
      }

      // Set starting height and animating classes
      // When animating from 'auto' we first need to set fixed height
      // that change should be animated
      setCurrentHeight(newHeight);
      setOverflow("hidden");
      setUseTransitions(!isCurrentHeightAuto);

      if (isCurrentHeightAuto) {
        // When animating from 'auto' we use a short timeout to start animation
        // after setting fixed height above
        timeoutUseTransitions = true;

        // Short timeout to allow rendering of the initial animation state first
        animationTimeout.start(50, () => {
          setCurrentHeight(timeoutHeight);
          setOverflow(timeoutOverflow);
          setUseTransitions(timeoutUseTransitions);
        });

        // Set static classes and remove transitions when animation ends
        animationClassTimeout.start(totalDuration, () => {
          setUseTransitions(false);

          // ANIMATION ENDS
          // Hide content if height is 0 (to prevent tabbing into it)
          hideContent(contentElement.current, timeoutHeight);
        });
      } else {
        // Set end height, classes and remove transitions when animation is complete
        animationTimeout.start(totalDuration, () => {
          setCurrentHeight(timeoutHeight);
          setOverflow(timeoutOverflow);
          setUseTransitions(false);

          // ANIMATION ENDS
          // If height is auto, don't hide the content
          // (case when element is empty, therefore height is 0)
          if (height !== "auto") {
            // Hide content if height is 0 (to prevent tabbing into it)
            hideContent(contentElement.current, newHeight); // TODO solve newHeight = 0
          }
        });
      }
    }

    prevHeight.current = height;

    /* We need to manually clear here since we cant guarantee the `.start()` getting called after `height` changes */
    return () => {
      animationTimeout.clear();
      animationClassTimeout.clear();
    };

    // This should be explicitly run only on height change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height]);

  // ------------------ Render

  const componentStyle: CSSProperties = {
    height: currentHeight,
    overflow,
  };

  if (useTransitions) {
    componentStyle.transition = `height ${duration}ms ${easing} 0ms`;

    // Add webkit vendor prefix still used by opera, blackberry...
    componentStyle.WebkitTransition = componentStyle.transition;
  }

  // Check if user passed aria-hidden prop
  const hasAriaHiddenProp = typeof props["aria-hidden"] !== "undefined";
  const ariaHidden = hasAriaHiddenProp ? props["aria-hidden"] : height === 0;

  return (
    <div {...props} className={className} style={componentStyle}>
      <div
        aria-hidden={ariaHidden}
        className={innerClassName}
        ref={contentElement}
      >
        {children}
      </div>
    </div>
  );
};

export default AnimateHeight;
