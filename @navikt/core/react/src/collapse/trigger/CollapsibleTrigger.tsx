import React, { forwardRef } from "react";
import { Slot } from "../../slot/Slot";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import type { AsChildProps } from "../../util/types";
import { useCollapsibleRootContext } from "../root/CollapsibleRoot.context";

type CollapsibleTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  AsChildProps;

const CollapsibleTrigger = forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(
  (
    {
      children,
      asChild,
      disabled: disabledProp,
      onClick,
      ...rest
    }: CollapsibleTriggerProps,
    forwardedRef,
  ) => {
    const { open, panelId, disabled, handleTrigger } =
      useCollapsibleRootContext();

    const Component = asChild ? Slot : "button";

    return (
      <Component
        ref={forwardedRef}
        {...rest}
        aria-controls={open ? panelId : undefined}
        aria-expanded={open}
        disabled={disabledProp ?? disabled}
        onClick={composeEventHandlers(onClick, handleTrigger)}
      >
        {children}
      </Component>
    );
  },
);

export { CollapsibleTrigger };
export type { CollapsibleTriggerProps };
