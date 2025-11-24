"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@navikt/aksel-icons";
import styles from "./CompareImages.module.css";
import { useCompareImages } from "./CompareImages.provider";

function CompareImagesHandle() {
  const { handle, dragging, handlePosition } = useCompareImages();
  const position = Math.round(handlePosition);

  return (
    <button
      onKeyDown={handle.onKeyDown}
      className={styles.compareImagesHandle}
      data-dragging={dragging.current}
      aria-label="Endre verdi for å sammenligne bilder"
      aria-orientation="horizontal"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={position}
      aria-valuetext={`${position}%`}
      data-rcs="handle-container"
      role="slider"
    >
      <span className={styles.compareImagesHandleLine} />
      <span className={styles.compareImagesHandleNotch}>
        <ChevronLeftIcon aria-hidden />
        <ChevronRightIcon aria-hidden />
      </span>
    </button>
  );
}

export { CompareImagesHandle };
