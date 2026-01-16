import React, { forwardRef } from "react";
import { Heading } from "../../typography";
import { useClientLayoutEffect, useId } from "../../util";
import { cl } from "../../util/className";
import { useDialogContext } from "../root/DialogRoot.context";

type DialogTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

/**
 * @see 🏷️ {@link DialogTitleProps}
 * @example
 * ```jsx
 *  <Dialog>
 *    <Dialog.Popup>
 *      <Dialog.Header>
 *        <Dialog.Title>Dialog title</Dialog.Title>
 *      </Dialog.Header>
 *    </Dialog.Popup>
 *  </Dialog>
 * ```
 */
const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, children, id, ...restProps }, forwardedRef) => {
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
        className={cl("aksel-dialog__title", className)}
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
