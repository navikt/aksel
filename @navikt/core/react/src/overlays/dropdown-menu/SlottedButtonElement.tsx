import React, { forwardRef } from "react";
import { Slot } from "../../slot/Slot";

interface SlottedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SlottedButtonElement = forwardRef<HTMLButtonElement, SlottedButtonProps>(
  ({ ...rest }, forwardedRef) => {
    return <Slot {...rest} ref={forwardedRef} />;
  },
);

type SlottedButtonElementRef = React.ElementRef<typeof SlottedButtonElement>;

export {
  SlottedButtonElement,
  type SlottedButtonElementRef,
  type SlottedButtonProps,
};
