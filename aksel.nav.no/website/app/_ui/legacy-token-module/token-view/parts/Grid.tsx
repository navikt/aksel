import React from "react";
import styles from "../TokenView.module.css";

export const Grid = ({
  children,
  stacked = false,
}: {
  children: React.ReactNode;
  stacked?: boolean;
}) => (
  <div data-stacked={stacked} className={styles.legacyTokenViewGrid}>
    {children}
  </div>
);
