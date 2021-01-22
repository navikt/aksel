import React from "react";

export interface LinkProps {
  element?: keyof React.ReactHTML;
  children?: React.ReactNode;
  [x: string]: any;
}

const Link = React.forwardRef<HTMLElement, LinkProps>(
  ({ element = "a", ...rest }, ref) =>
    React.createElement(element, { ...rest, ref })
);

export default Link;
