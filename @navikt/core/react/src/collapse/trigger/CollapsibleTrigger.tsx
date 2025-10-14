import React, { forwardRef } from "react";
import type { AsChildProps } from "../../util/types";

type CollapsibleTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  AsChildProps;

const CollapsibleTrigger = forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(({ children, ...rest }: CollapsibleTriggerProps, forwardedRef) => {
  return (
    <button ref={forwardedRef} {...rest}>
      {children}
    </button>
  );
});

export { CollapsibleTrigger };
export type { CollapsibleTriggerProps };
