import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";
import { createTransitionStatusAttribute } from "../../utils/hooks/useTransitionStatus";
import { useDialogContext } from "../root/DialogRoot.context";

type DialogBackdropInternalProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
>;

const DialogBackdropInternal = forwardRef<
  HTMLDivElement,
  DialogBackdropInternalProps
>(({ className, ...restProps }, forwardedRef) => {
  const { transitionStatus } = useDialogContext();

  return (
    <div
      {...restProps}
      ref={forwardedRef}
      className={cl("aksel-dialog__backdrop", className)}
      {...createTransitionStatusAttribute(transitionStatus)}
    />
  );
});

export { DialogBackdropInternal };
export type { DialogBackdropInternalProps };
