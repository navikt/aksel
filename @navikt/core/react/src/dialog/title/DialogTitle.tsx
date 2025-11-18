import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";
import { Heading } from "../../typography";
import { useClientLayoutEffect, useId } from "../../util";
import { useDialogContext } from "../root/DialogRoot.context";

type DialogTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

/**
 * @see 🏷️ {@link DialogTitleProps}
 * @example
 * ```jsx
 * ```
 */
const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, children, id, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();
    const { size, setTitleId } = useDialogContext();

    const titleId = useId(id);

    useClientLayoutEffect(() => {
      setTitleId(titleId);
      return () => {
        setTitleId(undefined);
      };
    }, [titleId, setTitleId]);

    return (
      <Heading
        {...restProps}
        id={titleId}
        ref={forwardedRef}
        className={cn("navds-dialog__title", className)}
        size={size}
        level="1"
      >
        {children}
      </Heading>
    );
  },
);

export { DialogTitle };
export type { DialogTitleProps };
