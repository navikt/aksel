import React, { useState } from "react";
import { useClientLayoutEffect } from "../../utils-external";

interface CoachmarkBackdropProps {
  anchorEl: Element;
}

const CoachmarkBackdrop = ({ anchorEl }: CoachmarkBackdropProps) => {
  const [rect, setRect] = useState<DOMRect | null>(null);

  useClientLayoutEffect(() => {
    const updateRect = () => setRect(anchorEl.getBoundingClientRect());
    const resizeObserver = new ResizeObserver(updateRect);

    updateRect();
    resizeObserver.observe(anchorEl);
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, true);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect, true);
    };
  }, [anchorEl]);

  if (!rect) {
    return null;
  }

  const padding = 12;
  const radius = 12;
  const left = rect.left - padding;
  const top = rect.top - padding;
  const right = rect.right + padding;
  const bottom = rect.bottom + padding;
  const clipPath = `path(evenodd, "M 0 0 H ${window.innerWidth} V ${window.innerHeight} H 0 Z M ${left + radius} ${top} H ${right - radius} A ${radius} ${radius} 0 0 1 ${right} ${top + radius} V ${bottom - radius} A ${radius} ${radius} 0 0 1 ${right - radius} ${bottom} H ${left + radius} A ${radius} ${radius} 0 0 1 ${left} ${bottom - radius} V ${top + radius} A ${radius} ${radius} 0 0 1 ${left + radius} ${top} Z")`;

  return (
    <div
      aria-hidden
      className="aksel-coachmark__backdrop"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        clipPath,
        pointerEvents: "none",
      }}
    />
  );
};

export { CoachmarkBackdrop };
export type { CoachmarkBackdropProps };
