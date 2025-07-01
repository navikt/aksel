"use client";

import cl from "clsx";
import { PauseFillIcon, PlayFillIcon } from "@navikt/aksel-icons";
import { Button, HStack, Heading } from "@navikt/ds-react";
import { AkselCubeAnimated } from "@/app/_ui/aksel-cube/AkselCube";
import styles from "../_ui/frontpage.module.css";
import { useShouldStopAnimation } from "./useShouldStopAnimation";

export const Hero = () => {
  const { pause, reducedMotion, setPause, shouldStopAnimation } =
    useShouldStopAnimation();

  return (
    <>
      <div>
        <div className={styles.hero}>
          <Heading
            level="1"
            size="xlarge"
            className={cl(styles.heroText, {
              "animation-stop": shouldStopAnimation,
            })}
          >
            Aksel gjør det enklere å lage digitale produkter
          </Heading>
          <div>
            <AkselCubeAnimated />
          </div>
        </div>
      </div>
      {!reducedMotion && (
        <HStack justify="end" marginBlock="0 space-16">
          <Button
            className={styles.animationButton}
            variant="tertiary-neutral"
            size="small"
            icon={
              pause ? (
                <PlayFillIcon title="Start" />
              ) : (
                <PauseFillIcon title="Stopp" />
              )
            }
            onClick={() => {
              setPause(!pause);
              localStorage.setItem("pause-animations", JSON.stringify(!pause));
            }}
          >
            Animasjon
          </Button>
        </HStack>
      )}
    </>
  );
};
