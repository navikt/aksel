"use client";

import {
  FloatingDelayGroup,
  safePolygon,
  useClick,
  useDelayGroup,
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

  const { delay } = useDelayGroup(context);

  const hover = useHover(context, {
    handleClose: safePolygon(),
    restMs: 500,
    delay,
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

export const HoverCardGroup = ({ children }: { children: ReactNode }) => {
  return (
    <FloatingDelayGroup delay={{ open: 700, close: 500 }}>
      {children}
    </FloatingDelayGroup>
  );
};
