"use client";

import { PauseFillIcon, PlayFillIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { useShouldStopAnimation } from "@/app/(routes)/(root)/_ui/useShouldStopAnimation";
import styles from "../_ui/frontpage.module.css";

function AnimationButton() {
  const { pause, reducedMotion, setPause } = useShouldStopAnimation();

  if (reducedMotion) {
    return null;
  }

  return (
    <Button
      className={styles.animationButton}
      variant="tertiary-neutral"
      size="small"
      icon={
        pause ? <PlayFillIcon title="Start" /> : <PauseFillIcon title="Stopp" />
      }
      onClick={() => {
        setPause(!pause);
        localStorage.setItem("pause-animations", JSON.stringify(!pause));
      }}
    >
      Animasjon
    </Button>
  );
}

export { AnimationButton };
