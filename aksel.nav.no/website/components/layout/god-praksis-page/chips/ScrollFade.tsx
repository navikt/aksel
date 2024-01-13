import cl from "clsx";
import { ChevronLeftIcon, ChevronRightIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import styles from "./Chips.module.css";
import { useScrollRangeOpacity } from "./useScrollRange";

type ScrollFadeProps = {
  id: string;
};
/**
 * TODO: Implement button functionality, scroll snap?
 */
function ScrollFade({ id }: ScrollFadeProps) {
  const scrollBlock = useScrollRangeOpacity(id);

  return (
    <>
      <div
        style={{ opacity: scrollBlock.start ? 1 : 0 }}
        aria-hidden
        className={cl(styles.shadow, styles.shadowStart)}
      />
      <div
        style={{ opacity: scrollBlock.end ? 1 : 0 }}
        aria-hidden
        className={cl(styles.shadow, styles.shadowEnd)}
      />
      <Button
        variant="tertiary-neutral"
        size="small"
        className={cl("absolute left-0 z-20 h-full w-12 justify-start", {
          hidden: !scrollBlock.start,
        })}
        icon={<ChevronLeftIcon fontSize="1.5rem" />}
        onClick={() => {
          const ref = document.getElementById(id);
          if (!ref) return;
          ref.scrollLeft -= 100;
        }}
      />
      <Button
        variant="tertiary-neutral"
        size="small"
        className={cl("absolute right-0 z-20 h-full w-12 justify-end", {
          hidden: !scrollBlock.end,
        })}
        icon={<ChevronRightIcon fontSize="1.5rem" />}
        onClick={() => {
          const ref = document.getElementById(id);
          if (!ref) return;
          ref.scrollLeft += 100;
        }}
      />
    </>
  );
}

export default ScrollFade;
