"use client";

import styles from "./CompareImages.module.css";
import { useCompareImages } from "./CompareImages.provider";

function CompareImagesContainer({ children }: { children: React.ReactNode }) {
  const { container, registerContainer } = useCompareImages();

  return (
    <div
      ref={registerContainer}
      style={container.styles}
      className={styles.compareImagesContainer}
      onPointerDown={container.onPointerDown}
    >
      {children}
    </div>
  );
}

export { CompareImagesContainer };
