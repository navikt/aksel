import React, { forwardRef } from "react";
import { Slot } from "../../slot/Slot";

interface SlottedDivProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const SlottedDivElement = forwardRef<HTMLDivElement, SlottedDivProps>(
  ({ asChild, ...rest }, forwardedRef) => {
    const Comp = asChild ? Slot : "div";
    return <Comp {...rest} ref={forwardedRef} />;
  },
);

type SlottedDivElementRef = React.ElementRef<typeof SlottedDivElement>;

export { SlottedDivElement, type SlottedDivElementRef, type SlottedDivProps };
