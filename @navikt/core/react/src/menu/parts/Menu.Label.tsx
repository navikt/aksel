import React, { forwardRef } from "react";
import {
  SlottedDivElement,
  type SlottedDivElementRef,
  type SlottedDivProps,
} from "./SlottedDivElement";

interface MenuLabelProps extends SlottedDivProps {}

const MenuLabel = forwardRef<SlottedDivElementRef, MenuLabelProps>(
  (props: MenuLabelProps, ref) => {
    return <SlottedDivElement {...props} ref={ref} />;
  },
);

export { MenuLabel, type MenuLabelProps };
