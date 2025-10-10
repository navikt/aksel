import React, { forwardRef, useEffect, useState } from "react";
import { Slot } from "../../../slot/Slot";
import { useCallbackRef, useMergeRefs } from "../../../util/hooks";
import { ownerDocument } from "../../../util/owner";

const AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
const AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
const EVENT_OPTIONS = { bubbles: false, cancelable: true };

interface FocusScopeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Event handler called on mount, unless the component already has focus. Used for auto-focusing.
   * Can be prevented.
   */
  onMountHandler?: (event: Event) => void;
  /**
   * Event handler called on unmount. Used for auto-focusing.
   * Can be prevented.
   */
  onUnmountHandler?: (event: Event) => void;
}

/**
 * FocusScope manages focus on mount and unmount of container.
 * This is used to better handle autofocus of elements when mounted and unmounted.
 * Example usage:
 * - Focus first item in a list when mounted
 * - Focus a button when unmounted
 */
const FocusScope = forwardRef<HTMLDivElement, FocusScopeProps>(
  (
    {
      onMountHandler: onMountHandlerCallback,
      onUnmountHandler: onUnmountHandlerCallback,
      ...rest
    },
    ref,
  ) => {
    const [container, setContainer] = useState<HTMLElement | null>(null);
    const onMountHandler = useCallbackRef(onMountHandlerCallback);
    const onUnmountHandler = useCallbackRef(onUnmountHandlerCallback);

    const composedRefs = useMergeRefs(ref, setContainer);

    useEffect(() => {
      if (!container) return;

      const ownerDoc = ownerDocument(container);
      const hasFocus = container.contains(ownerDoc.activeElement);

      if (!hasFocus) {
        const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
        container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountHandler);
        container.dispatchEvent(mountEvent);
      }

      return () => {
        container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountHandler);

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
          container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountHandler);
          container.dispatchEvent(unmountEvent);

          // we need to remove the listener after we `dispatchEvent`
          container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountHandler);
        }, 0);
      };
    }, [container, onMountHandler, onUnmountHandler]);

    return <Slot tabIndex={-1} {...rest} ref={composedRefs} />;
  },
);

export { FocusScope, type FocusScopeProps };
