import React, { forwardRef } from "react";
import {
  SlottedDivElement,
  type SlottedDivElementRef,
  type SlottedDivProps,
} from "./SlottedDivElement";

interface MenuGroupProps extends SlottedDivProps {}

const MenuGroup = forwardRef<SlottedDivElementRef, MenuGroupProps>(
  (props: MenuGroupProps, ref) => {
    return <SlottedDivElement role="group" {...props} ref={ref} />;
  },
);

export { MenuGroup, type MenuGroupProps };
