"use client";

import { useTheme } from "next-themes";
import Snowfall from "react-snowfall";
import { useShouldStopAnimation } from "@/app/(routes)/(root)/_ui/useShouldStopAnimation";

function Snow() {
  const { pause, reducedMotion } = useShouldStopAnimation();
  const { resolvedTheme } = useTheme();

  if (resolvedTheme === "light") {
    return null;
  }

  return (
    <div aria-hidden>
      <Snowfall
        style={{ zIndex: -1 }}
        color="rgba(230, 241, 248, 0.9)"
        speed={reducedMotion || pause ? [0.1, 0.2] : [0.4, 1.0]}
        wind={reducedMotion || pause ? [-0.1, 0.2] : [-0.5, 1.0]}
        snowflakeCount={600}
        enable3DRotation={!(reducedMotion || pause)}
      />
    </div>
  );
}

export { Snow };
