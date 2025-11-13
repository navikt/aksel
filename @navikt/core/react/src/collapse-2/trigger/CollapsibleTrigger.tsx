import React, { forwardRef } from "react";
import { Slot } from "../../slot/Slot";
import { useClientLayoutEffect } from "../../util";
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
      id: idProp,
      ...rest
    }: CollapsibleTriggerProps,
    forwardedRef,
  ) => {
    const {
      open,
      panelId,
      disabled,
      handleTrigger,
      setTriggerIdState,
      triggerId,
    } = useCollapsibleRootContext();

    useClientLayoutEffect(() => {
      if (idProp) {
        setTriggerIdState(idProp);
        return () => {
          setTriggerIdState(undefined);
        };
      }
      return undefined;
    }, [idProp]);

    const Component = asChild ? Slot : "button";

    return (
      <Component
        ref={forwardedRef}
        {...rest}
        id={triggerId}
        aria-controls={open ? panelId : undefined}
        aria-expanded={open}
        disabled={disabledProp ?? disabled}
        data-state={open ? "open" : "closed"}
        onClick={composeEventHandlers(onClick, handleTrigger)}
      >
        {children}
      </Component>
    );
  },
);

export { CollapsibleTrigger };
export type { CollapsibleTriggerProps };
