import { useContext, useState } from "react";
import { useClientLayoutEffect } from "@navikt/ds-react/Utils";
import { userPrefersReducedMotion } from "@/utils";
import { PauseAnimationContext } from "./AnimationStopContext";

export const useShouldStopAnimation = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  const { pauseAnimationState, setPauseAnimationState } = useContext(
    PauseAnimationContext,
  );

  useClientLayoutEffect(() => {
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
  }, []);

  return {
    shouldStopAnimation: pauseAnimationState || reducedMotion,
    pause: pauseAnimationState,
    setPause: setPauseAnimationState,
    reducedMotion,
  };
};
