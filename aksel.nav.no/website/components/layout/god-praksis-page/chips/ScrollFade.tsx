import cl from "clsx";
import styles from "./Chips.module.css";
import { useScrollRangeOpacity } from "./useScrollRange";

type ScrollFadeProps = {
  wrapperId: string;
};

function ScrollFade({ wrapperId }: ScrollFadeProps) {
  const scrollBlock = useScrollRangeOpacity(wrapperId);

  return (
    <>
      <div
        style={{ opacity: scrollBlock.start }}
        aria-hidden
        className={cl(styles.shadow, styles.shadowStart)}
      />
      <div
        style={{ opacity: scrollBlock.end }}
        aria-hidden
        className={cl(styles.shadow, styles.shadowEnd)}
      />
    </>
  );
}

export default ScrollFade;
