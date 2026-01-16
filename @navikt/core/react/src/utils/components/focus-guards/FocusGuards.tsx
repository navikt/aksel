import React from "react";
import { useMergeRefs } from "../../hooks";

const visuallyHidden: React.CSSProperties = {
  clip: "rect(0 0 0 0)",
  overflow: "hidden",
  whiteSpace: "nowrap",
  position: "fixed",
  top: 0,
  left: 0,
  border: 0,
  padding: 0,
  width: 1,
  height: 1,
  margin: -1,
};

type FocusGuardsProps = {
  children: React.ReactNode;
  startRef?: React.RefObject<HTMLSpanElement>;
  endRef?: React.RefObject<HTMLSpanElement>;
};

function FocusGuards({
  children,
  startRef: forwardedStartRef,
  endRef: forwardedEndRef,
}: FocusGuardsProps) {
  const startRef = React.useRef<HTMLSpanElement | null>(null);
  const endRef = React.useRef<HTMLSpanElement | null>(null);

  const startRefCombined = useMergeRefs(startRef, forwardedStartRef);
  const endRefCombined = useMergeRefs(endRef, forwardedEndRef);

  return (
    <React.Fragment>
      <span
        ref={startRefCombined}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        style={visuallyHidden}
        data-aksel-focus-guard=""
      />
      {children}
      <span
        ref={endRefCombined}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        style={visuallyHidden}
        data-aksel-focus-guard=""
      />
    </React.Fragment>
  );
}

export { FocusGuards };
