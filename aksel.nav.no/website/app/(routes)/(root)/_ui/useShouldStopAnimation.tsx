import { useContext, useState } from "react";
import { useClientLayoutEffect } from "@navikt/ds-react";
import { PauseAnimationContext } from "./AnimationStopContext";

function useShouldStopAnimation() {
  const [reducedMotion, setReducedMotion] = useState(false);

  const { pauseAnimationState, setPauseAnimationState } = useContext(
    PauseAnimationContext,
  );

  useClientLayoutEffect(() => {
    // using safari on iOS seems to break VO
    const disableAnimations =
      navigator.userAgent.indexOf("Safari") !== -1 &&
      navigator.userAgent.indexOf("Chrome") === -1;

    setReducedMotion(userPrefersReducedMotion() || disableAnimations);
    const data = localStorage.getItem("pause-animations");
    if (disableAnimations) {
      setPauseAnimationState(true);
      return;
    }
    setPauseAnimationState(JSON.parse(data ?? "false"));
  }, [setPauseAnimationState]);

  return {
    shouldStopAnimation: pauseAnimationState || reducedMotion,
    pause: pauseAnimationState,
    setPause: setPauseAnimationState,
    reducedMotion,
  };
}

function userPrefersReducedMotion() {
  return !window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
}

export { useShouldStopAnimation };
