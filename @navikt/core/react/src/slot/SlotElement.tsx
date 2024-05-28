import React, { forwardRef } from "react";
import { OverridableComponent } from "../util";
import { Slot } from "./Slot";

interface SlottedProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const SlottedElement: OverridableComponent<SlottedProps, HTMLDivElement> =
  forwardRef(({ asChild, as: Element = "div", ...rest }, forwardedRef) => {
    const Comp = asChild ? Slot : Element;
    return <Comp {...rest} ref={forwardedRef} />;
  });

type SlottedElementRef = React.ElementRef<typeof SlottedElement>;

export { SlottedElement, type SlottedElementRef, type SlottedProps };
