import React, { HTMLAttributes, forwardRef, useEffect, useRef } from "react";
import { useMergeRefs } from "../../../util/hooks";
import { useFloatingContext } from "../Floating.context";
import { Measurable } from "../Floating.types";

interface FloatingAnchorProps extends HTMLAttributes<HTMLDivElement> {
  virtualRef?: React.RefObject<Measurable>;
}

/**
 * `FloatingAnchor` provides an anchor for a Floating instance.
 * Allows anchoring to non-DOM nodes like a cursor position when used with `virtualRef`.
 */
export const FloatingAnchor = forwardRef<HTMLDivElement, FloatingAnchorProps>(
  ({ virtualRef, ...rest }: FloatingAnchorProps, forwardedRef) => {
    const context = useFloatingContext();
    const ref = useRef<HTMLDivElement>(null);

    const mergedRef = useMergeRefs(forwardedRef, ref);

    useEffect(() => {
      // Allows anchoring the floating to non-DOM nodes like a cursor position.
      // We replace `anchorRef` with a virtual ref in such cases.
      context.onAnchorChange(virtualRef?.current || ref.current);
    });

    return virtualRef ? null : <div ref={mergedRef} {...rest} />;
  },
);
