"use client";

import cl from "clsx";
import styles from "./landingpage.module.css";
import { useShouldStopAnimation } from "./useShouldStopAnimation";

export const HeroGradientBG = () => {
  const { shouldStopAnimation } = useShouldStopAnimation();

  return (
    <div
      className={cl(styles.heroLinearBG, {
        "animation-stop": shouldStopAnimation,
      })}
    />
  );
};
