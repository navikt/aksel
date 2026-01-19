"use client";

import throttle from "lodash/throttle";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useClientLayoutEffect } from "@navikt/ds-react";
import styles from "./TableOfContents.module.css";

function TableOfContentsScroll({ tocLength }: { tocLength: number }) {
  const [scrollBlock, setScrollBlock] = useState({ start: "0", end: "0" });
  const pathName = usePathname();

  useClientLayoutEffect(() => {
    const ref = document.getElementById("toc-scroll-wrapper");
    if (!ref) {
      return;
    }
    setScrollBlock({
      start: "0",
      end: getOpacity(ref.scrollHeight - ref.clientHeight),
    });

    const onScroll = (event) =>
      setScrollBlock({
        start: getOpacity(event.target.scrollTop),
        end: getOpacity(
          Math.floor(
            event.target.scrollHeight -
              event.target.scrollTop -
              event.target.clientHeight,
          ),
        ),
      });

    const func = throttle(onScroll, 50);

    ref.addEventListener("scroll", func);
    return () => {
      ref.removeEventListener("scroll", func);
    };
  }, [pathName, tocLength]);

  return (
    <>
      <div
        style={{ opacity: scrollBlock.start }}
        aria-hidden
        className={`${styles.tocShadow} ${styles.tocShadowTop}`}
      />
      <div
        style={{ opacity: scrollBlock.end }}
        aria-hidden
        className={`${styles.tocShadow} ${styles.tocShadowBottom}`}
      />
    </>
  );
}

function getOpacity(n: number): string {
  return Math.min(Math.min(Math.max(n, 0), 100) / 100, 1).toFixed(1);
}

export { TableOfContentsScroll };
