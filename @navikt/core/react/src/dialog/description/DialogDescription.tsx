import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";
import { BodyShort } from "../../typography";
import { useClientLayoutEffect, useId } from "../../util";
import { useDialogContext } from "../root/DialogRoot.context";

type DialogDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

/**
 * @see 🏷️ {@link DialogDescriptionProps}
 * @example
 * ```jsx
 * ```
 */
const DialogDescription = forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ className, children, id, ...restProps }, forwardedRef) => {
  const { cn } = useRenameCSS();
  const { size, setDescriptionId } = useDialogContext();

  const descriptionId = useId(id);

  useClientLayoutEffect(() => {
    setDescriptionId(descriptionId);
    return () => {
      setDescriptionId(undefined);
    };
  }, [descriptionId, setDescriptionId]);

  return (
    <BodyShort
      {...restProps}
      id={descriptionId}
      ref={forwardedRef}
      className={cn(className, "navds-dialog__description")}
      size={size}
      data-color="neutral"
      textColor="subtle"
    >
      {children}
    </BodyShort>
  );
});

export { DialogDescription };
export type { DialogDescriptionProps };
