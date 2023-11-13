import cl from "clsx";
import styles from "./table-of-contents.module.css";
import { useScrollRange } from "./useScrollRange";

function getOpacity(n: number) {
  return Math.min(Math.min(Math.max(n, 0), 100) / 100, 1).toFixed(1);
}

function ScrollFade() {
  const scrollBlock = useScrollRange();

  return (
    <>
      <div
        style={{ opacity: getOpacity(scrollBlock.start) }}
        aria-hidden
        className={cl(styles.shadow, styles.shadowTop)}
      />
      <div
        style={{ opacity: getOpacity(scrollBlock.end) }}
        aria-hidden
        className={cl(styles.shadow, styles.shadowBottom)}
      />
    </>
  );
}

export default ScrollFade;
