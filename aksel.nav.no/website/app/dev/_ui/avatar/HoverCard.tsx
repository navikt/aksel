"use client";

import {
  safePolygon,
  useClick,
  useFloating,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import { ReactNode, useState } from "react";
import styles from "./HoverCard.module.css";

export const HoverCard = ({
  popoverContent,
  children,
}: {
  popoverContent: ReactNode;
  children: ReactNode;
}) => {
  const [openState, setOpenState] = useState(false);

  const { context, floatingStyles, refs } = useFloating({
    open: openState,
    onOpenChange: setOpenState,
  });

  const click = useClick(context);

  const hover = useHover(context, {
    handleClose: safePolygon(),
    restMs: 500,
    delay: { close: 500 },
    move: false,
  });

  const { getFloatingProps, getReferenceProps } = useInteractions([
    hover,
    click,
  ]);

  return (
    <>
      <button
        ref={refs.setReference}
        aria-expanded={openState}
        className={styles.trigger}
        {...getReferenceProps()}
      >
        {children}
      </button>
      {openState && (
        <div
          ref={refs.setFloating}
          {...getFloatingProps()}
          style={floatingStyles}
          className={styles.floating}
        >
          {popoverContent}
        </div>
      )}
    </>
  );
};
