"use client";

import cl from "clsx";
import styles from "./frontpage.module.css";
import { useShouldStopAnimation } from "./useShouldStopAnimation";

export const MainWrapper = ({ children }) => {
  const { shouldStopAnimation } = useShouldStopAnimation();

  return (
    <main
      tabIndex={-1}
      id="hovedinnhold"
      className={cl(styles.frontPage, {
        "animation-stop": shouldStopAnimation,
      })}
    >
      {children}
    </main>
  );
};
