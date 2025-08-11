"use client";

import cl from "clsx";
import { Heading } from "@navikt/ds-react";
import { AkselCubeAnimated } from "@/app/_ui/aksel-cube/AkselCube";
import styles from "../_ui/frontpage.module.css";
import { useShouldStopAnimation } from "./useShouldStopAnimation";

export const Hero = () => {
  const { shouldStopAnimation } = useShouldStopAnimation();

  return (
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
  );
};
