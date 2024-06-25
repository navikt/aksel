import React, { forwardRef } from "react";
import { Slot } from "../slot/Slot";
import { composeEventHandlers } from "../util/composeEventHandlers";
import { useModalRootContext } from "./Modal.Root";

export interface ModalTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const ModalTrigger = forwardRef<HTMLButtonElement, ModalTriggerProps>(
  ({ asChild, children, onClick, ...rest }, ref) => {
    const context = useModalRootContext();
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={context.open}
        aria-controls={context.contentId}
        {...rest}
        onClick={composeEventHandlers(onClick, context.onOpenToggle)}
      >
        {children}
      </Comp>
    );
  },
);

export default ModalTrigger;
