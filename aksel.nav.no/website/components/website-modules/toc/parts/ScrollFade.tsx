import cl from "clsx";
import styles from "./table-of-contents.module.css";
import { useScrollRangeOpacity } from "./useScrollRange";

function ScrollFade() {
  const scrollBlock = useScrollRangeOpacity();

  return (
    <>
      <div
        style={{ opacity: scrollBlock.start }}
        aria-hidden
        className={cl(styles.shadow, styles.shadowTop)}
      />
      <div
        style={{ opacity: scrollBlock.end }}
        aria-hidden
        className={cl(styles.shadow, styles.shadowBottom)}
      />
    </>
  );
}

export default ScrollFade;
