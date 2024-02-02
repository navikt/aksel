import React, { HTMLAttributes, forwardRef, useEffect, useRef } from "react";
import { Slot } from "../../../util/Slot";
import { useMergeRefs } from "../../../util/hooks";
import { useFloatingContext } from "../Floating.context";
import { Measurable } from "../Floating.types";

interface FloatingAnchorProps extends HTMLAttributes<HTMLDivElement> {
  virtualRef?: React.RefObject<Measurable>;
  asChild?: boolean;
}

/**
 * `FloatingAnchor` provides an anchor for a Floating instance.
 * Allows anchoring to non-DOM nodes like a cursor position when used with `virtualRef`.
 */
export const FloatingAnchor = forwardRef<HTMLDivElement, FloatingAnchorProps>(
  ({ virtualRef, asChild, ...rest }: FloatingAnchorProps, forwardedRef) => {
    const context = useFloatingContext();
    const ref = useRef<HTMLDivElement>(null);

    const mergedRef = useMergeRefs(forwardedRef, ref);

    useEffect(() => {
      // Allows anchoring the floating to non-DOM nodes like a cursor position.
      // We replace `anchorRef` with a virtual ref in such cases.
      context.onAnchorChange(virtualRef?.current || ref.current);
    });

    const Comp = asChild ? Slot : "div";

    return virtualRef ? null : <Comp ref={mergedRef} {...rest} />;
  },
);
