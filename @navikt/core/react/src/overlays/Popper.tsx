import React, { HTMLAttributes, forwardRef, useRef, useState } from "react";
import { createContext } from "../util/create-context";
import { useMergeRefs } from "../util/hooks";

type Measurable = { getBoundingClientRect(): DOMRect };

/**
 * Popper
 */
type PopperContextValue = {
  anchor: Measurable | null;
  onAnchorChange(anchor: Measurable | null): void;
};

const [PopperProvider, usePopperContext] = createContext<PopperContextValue>({
  name: "PopperContext",
  hookName: "usePopper",
  providerName: "PopperProvider",
});

interface PopperProps {
  children: React.ReactNode;
}

export const Popper = ({ children }: PopperProps) => {
  const [anchor, setAnchor] = useState<Measurable | null>(null);

  return (
    <PopperProvider anchor={anchor} onAnchorChange={setAnchor}>
      {children}
    </PopperProvider>
  );
};

/**
 * PopperAnchor
 */
interface PopperAnchorProps extends HTMLAttributes<HTMLDivElement> {
  virtualRef?: React.RefObject<Measurable>;
}

/**
 * `PopperAnchor` provides an anchor for a Popper instance.
 * Allows anchoring to non-DOM nodes like a cursor position when used with `virtualRef`.
 */
export const PopperAnchor = forwardRef<HTMLDivElement, PopperAnchorProps>(
  ({ virtualRef, ...rest }: PopperAnchorProps, forwardedRef) => {
    const context = usePopperContext();
    const ref = useRef<HTMLDivElement>(null);

    const mergedRef = useMergeRefs(forwardedRef, ref);

    React.useEffect(() => {
      // Allows anchoring the popper to non-DOM nodes like a cursor position.
      // We replace `anchorRef` with a virtual ref in such cases.
      context.onAnchorChange(virtualRef?.current || ref.current);
    });

    return virtualRef ? null : <div ref={mergedRef} {...rest} />;
  },
);
