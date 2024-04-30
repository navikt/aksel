import { useComposedRefs } from "@radix-ui/react-compose-refs";
import * as React from "react";
import { useEffect, useState } from "react";
import { Slot } from "../util/Slot";
import { useCallbackRef } from "../util/hooks";

const AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
const AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
const EVENT_OPTIONS = { bubbles: false, cancelable: true };

interface FocusScopeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   *
   */
  asChild?: boolean;
  /**
   * Event handler called when auto-focusing on mount.
   * Can be prevented.
   */
  onMountAutoFocus?: (event: Event) => void;
  /**
   * Event handler called when auto-focusing on unmount.
   * Can be prevented.
   */
  onUnmountAutoFocus?: (event: Event) => void;
}

const FocusScope = React.forwardRef<HTMLDivElement, FocusScopeProps>(
  (
    {
      onMountAutoFocus: onMountAutoFocusProp,
      onUnmountAutoFocus: onUnmountAutoFocusProp,
      ...rest
    },
    ref,
  ) => {
    const [container, setContainer] = useState<HTMLElement | null>(null);
    const onMountAutoFocus = useCallbackRef(onMountAutoFocusProp);
    const onUnmountAutoFocus = useCallbackRef(onUnmountAutoFocusProp);

    const composedRefs = useComposedRefs(ref, (node) => setContainer(node));

    useEffect(() => {
      if (container) {
        const previouslyFocusedElement = document.activeElement;
        const hasFocusedCandidate = container.contains(
          previouslyFocusedElement,
        );

        if (!hasFocusedCandidate) {
          const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
          container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
          container.dispatchEvent(mountEvent);
        }

        return () => {
          container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);

          /**
           * https://github.com/facebook/react/issues/17894
           * As usual when dealing with focus and useEffect,
           * we need to defer the focus to the next event-loop
           * setTimeout makes sure the code is ran after the next render-cycle
           */
          setTimeout(() => {
            const unmountEvent = new CustomEvent(
              AUTOFOCUS_ON_UNMOUNT,
              EVENT_OPTIONS,
            );
            container.addEventListener(
              AUTOFOCUS_ON_UNMOUNT,
              onUnmountAutoFocus,
            );
            container.dispatchEvent(unmountEvent);

            // we need to remove the listener after we `dispatchEvent`
            container.removeEventListener(
              AUTOFOCUS_ON_UNMOUNT,
              onUnmountAutoFocus,
            );
          }, 0);
        };
      }
    }, [container, onMountAutoFocus, onUnmountAutoFocus]);

    return <Slot tabIndex={-1} {...rest} ref={composedRefs} />;
  },
);

export { FocusScope, type FocusScopeProps };
